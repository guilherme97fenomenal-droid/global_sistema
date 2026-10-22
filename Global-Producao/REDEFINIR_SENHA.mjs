import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createInterface} from 'node:readline/promises';

export async function resetPassword(login,password){
 const data=resolve(process.env.DATA_DIR||'data');
 if(!existsSync(resolve(data,'global.sqlite')))throw new Error('Banco não encontrado. Coloque estes arquivos na pasta do sistema que contém a pasta data.');
 const {db,read,transaction}=await import('./server/store.mjs');
 const {normalizeLogin,hashPassword}=await import('./server/auth.mjs');
 const {backup}=await import('node:sqlite');
 login=normalizeLogin(login);
 const user=read().state.users.find(u=>u.login===login&&u.active!==false);
 if(!user)throw new Error('Login não encontrado ou inativo. Confira o login listado.');
 const hash=await hashPassword(password);
 const target=resolve(data,'antes-redefinicao-'+Date.now()+'.sqlite');
 await backup(db,target);
 transaction(()=>{
  db.prepare('INSERT INTO credentials (user_id,login,hash) VALUES (?,?,?) ON CONFLICT(user_id) DO UPDATE SET login=excluded.login,hash=excluded.hash').run(user.id,login,hash);
  db.prepare('DELETE FROM sessions WHERE user_id=?').run(user.id);
  db.prepare('DELETE FROM attempts').run();
 });
 return target;
}
async function secret(label){
 process.stdout.write(label);process.stdin.setRawMode(true);process.stdin.resume();let value='';
 return new Promise((resolve,reject)=>{
 const cleanup=()=>{process.stdin.off('data',onData);process.stdin.setRawMode(false);process.stdin.pause();process.stdout.write('\n')};
 const onData=b=>{for(const c of b.toString()){
  if(c==='\u0003'){cleanup();reject(new Error('Cancelado'));return}
  if(c==='\r'||c==='\n'){cleanup();resolve(value);return}
  if(c==='\u007f'||c==='\b')value=value.slice(0,-1);else if(c>=' ')value+=c;
 }};process.stdin.on('data',onData);
 });
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  if(!process.stdin.isTTY)throw new Error('Abra pelo arquivo REDEFINIR_SENHA.cmd.');
  if(!existsSync(resolve(process.env.DATA_DIR||'data','global.sqlite')))throw new Error('Pasta data não encontrada junto destes arquivos.');
  const {read}=await import('./server/store.mjs');
  console.log('Logins ativos:');for(const u of read().state.users.filter(u=>u.active!==false))console.log('  '+u.login+' - '+u.name);
  const rl=createInterface({input:process.stdin,output:process.stdout});const login=await rl.question('Qual login deseja redefinir? ');rl.close();
  const password=await secret('Nova senha (10 a 128 caracteres; não aparece ao digitar): ');
  const confirm=await secret('Repita a nova senha: ');
  if(password!==confirm)throw new Error('Senhas diferentes. Nada foi alterado.');
  const backupPath=await resetPassword(login,password);
  console.log('Senha redefinida. Cadastros e pedidos preservados. Backup do banco: '+backupPath);
  console.log('Abra INICIAR_WINDOWS.cmd e entre com a nova senha.');
 }catch(e){console.error(e.message);process.exitCode=1}
}
