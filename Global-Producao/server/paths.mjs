import path from 'node:path';
/** Resolve dentro da pasta permitida, respeitando os separadores do Windows/POSIX. */
export function insidePath(root,requested,pathApi=path){
 const file=pathApi.resolve(root,requested);
 const relative=pathApi.relative(pathApi.resolve(root),file);
 if(!relative||relative==='..'||relative.startsWith('..'+pathApi.sep)||pathApi.isAbsolute(relative))return null;
 return file;
}
