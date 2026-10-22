import {DatabaseSync} from 'node:sqlite';
import {mkdirSync} from 'node:fs';import {resolve} from 'node:path';
import {emptyState} from '../lib/domain.mjs';
export const dataDir=resolve(process.env.DATA_DIR||'data');mkdirSync(dataDir,{recursive:true,mode:0o700});
export const db=new DatabaseSync(resolve(dataDir,'global.sqlite'));
db.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS state (id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL, data TEXT NOT NULL); CREATE TABLE IF NOT EXISTS credentials (user_id TEXT PRIMARY KEY, login TEXT UNIQUE NOT NULL, hash TEXT NOT NULL); CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires INTEGER NOT NULL); CREATE TABLE IF NOT EXISTS attempts (key TEXT PRIMARY KEY, count INTEGER NOT NULL, until_time INTEGER NOT NULL);');
db.prepare('INSERT OR IGNORE INTO state VALUES (1,0,?)').run(JSON.stringify(emptyState()));
export function read(){const r=db.prepare('SELECT * FROM state WHERE id=1').get();return {state:JSON.parse(r.data),revision:r.revision}}
export function save(state,revision){const json=JSON.stringify(state);if(json.length>7_000_000)throw new Error('Limite da versão inicial atingido. Solicite ampliação do banco.');if(!db.prepare('UPDATE state SET data=?,revision=revision+1 WHERE id=1 AND revision=?').run(json,revision).changes)throw new Error('Outro usuário atualizou os dados. Atualize a tela.');}
export function transaction(fn){db.exec('BEGIN IMMEDIATE');try{const result=fn();db.exec('COMMIT');return result}catch(e){db.exec('ROLLBACK');throw e}}
