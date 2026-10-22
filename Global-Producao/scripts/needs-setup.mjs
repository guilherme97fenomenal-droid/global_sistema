import {read,db} from '../server/store.mjs';const missing=!read().state.users.length;db.close();process.exitCode=missing?1:0;
