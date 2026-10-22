# Global Produção — versão independente 0.2.0

22/10/2026. Login e senha próprios, sem e-mail obrigatório. Este pacote é separado da demonstração hospedada no ChatGPT e do sistema antigo da Global. Nenhuma alteração foi feita nesses sistemas.

## Começar no Windows
1. Instale Node.js da linha 24 LTS (24.13 ou superior, abaixo da linha 25), de https://nodejs.org/.
2. Extraia TODO este ZIP em uma pasta (não execute de dentro do ZIP).
3. Dê dois cliques em `INICIAR_WINDOWS.cmd`.
4. No primeiro uso, o terminal pede nome, login e senha do primeiro administrador. A senha fica oculta e precisa ter 10 a 128 caracteres. Não há senha padrão.
5. Abra http://localhost:3000 no navegador. A primeira tela é o login. Entre com os dados criados.
6. Mantenha o terminal aberto enquanto usa o sistema. Para parar, Ctrl+C.

A pasta `dist` já está compilada. Para executar a versão fornecida não precisa instalar dependências npm: o servidor usa módulos nativos do Node. Não abra `index.html` com duplo clique, pois os registros e o login precisam do servidor.

## Cadastro e saída
No perfil Administrador: Cadastros → Usuários → Novo cadastro. Campos: nome, login, senha inicial, perfis, cliente vinculado quando aplicável, setores e ativo. Não há e-mail obrigatório. Login não diferencia maiúsculas/minúsculas. Em edição, deixe Nova senha vazia para manter a atual. A senha atual nunca aparece. Editar o acesso de um usuário encerra suas sessões, incluindo alterações de setor/perfil e inativação. Botão Sair no topo, inclusive no celular, encerra a sessão no servidor e retorna ao login.

Sessões duram até 8 horas. Reabrir com sessão válida mantém acesso; sem sessão ou depois de Sair, abre login. Recuperação de senha sem e-mail: administrador redefine. Não há acesso livre para autocadastro.

## Linux / macOS
Com Node 24 instalado: `node scripts/admin.mjs` (só primeira vez), depois `node server/index.mjs`; abrir http://localhost:3000.

## Dados e backups
Banco SQLite e anexos na pasta `data`, criada na primeira execução. Nunca apague esta pasta. Não inclua dados reais ao enviar código a terceiros.
- Pela interface: backup JSON com registros e anexos. Senhas/hash e sessões são excluídos. Após restaurar, usuários além do administrador atual ficam inativos: admin deve definir login/senha e reativá-los.
- Para copiar a instalação inteira: pare o servidor e copie `data` por completo. Essa cópia inclui hashes de senhas e deve ser protegida. Não copie somente o arquivo SQLite enquanto o servidor estiver aberto (há arquivos WAL).
- Limites iniciais herdados: 7 MB de registros no agregado, 10 MB por anexo, 40 MB por backup de anexos. Restauração pela interface somente em base sem pedidos.
- Código-fonte em `public/source.zip`, disponível no menu Backup e projeto ao administrador. Backup de código é diferente do backup de dados.

## Hospedagem futura
Ainda não foi contratado nem configurado um servidor online. O endereço localhost só funciona no computador onde este servidor foi iniciado. O link anterior do ChatGPT NÃO aponta para este pacote.

Para disponibilizar à empresa: servidor Node24 com disco persistente, HTTPS/reverse proxy, domínio e backups externos. Configurar `NODE_ENV=production`, `APP_ORIGIN=https://seu-dominio`, `HOST=127.0.0.1` atrás do proxy e `DATA_DIR` apontando para volume persistente. Sem HTTPS o servidor recusa configuração de produção. Não usar hospedagem estática, pasta OneDrive como banco ativo, filesystem efêmero ou múltiplas réplicas sem adaptar armazenamento.

## Desenvolvimento e continuidade
`npm ci`, `npm test`, `npm run build`. Depois `npm start`.
Leia `docs/CONTINUIDADE.md`, `docs/ARQUITETURA.md` e `docs/REQUISITOS.md`. O domínio das etapas foi reaproveitado da v0.1. O sistema ainda requer homologação com usuários antes de operação real. Boleto, WhatsApp/e-mail automáticos e fluxo avançado de perdas/lotes continuam pendentes.
