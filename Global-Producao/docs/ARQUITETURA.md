# Arquitetura independente

Node24 HTTP nativo + SQLite (`node:sqlite`) + filesystem. React/Vite compila SPA em dist. Não depende do ChatGPT para login/execução.

- lib/domain.mjs: transições/permissões reaproveitadas, cadastro por login em vez de e-mail.
- server/store.mjs: SQLite, agregado com revisão, credenciais, sessões e limites persistentes; transações sincronizadas.
- server/auth.mjs: scrypt N=131072,r=8,p=1, salt aleatório de 16 bytes; comparação timingSafeEqual. Token de sessão aleatório de 32 bytes, apenas SHA256 armazenado. Cookie HttpOnly/SameSite Strict/Secure em produção, validade 8h.
- server/index.mjs: login/logout, state, arquivos, backup e estáticos. Origin exata para mutações, sem CORS aberto. Sem confiança em perfil fornecido pelo navegador; cada comando revalida ator.
- scripts/admin.mjs: primeiro administrador somente por terminal local, sem endpoint público de bootstrap, sem senha padrão.
- src/main.tsx: entrada na tela de login quando não autenticado; logout e retorno ao login.
- src/workspace.tsx: telas de negócio. User form com login e senha, perfis e setores.

Cadastro/alteração de usuário e credencial salvos na mesma transação SQLite. Hash preparado fora da transação e revisão conferida ao gravar. Senha removida do payload antes de trilha de auditoria. Edição de acesso revoga todas as sessões do usuário. Retorno me/listagem nunca inclui hash. Login verifica novamente o hash após derivação para rejeitar senha redefinida em requisição concorrente.

Limitação de login: oito tentativas por login e endereço remoto em janela de 15min, limpeza no sucesso. Atrás de reverse proxy, endereço é do proxy (conservador; sem confiar em X-Forwarded-For arbitrário). Para implantação grande, configurar proxy confiável e limites por origem corretamente.

Backup pela interface exclui tabela credentials/sessions. Restore preserva admin atual e desativa demais contas, exigindo redefinição. Para disaster recovery integral usar cópia offline da pasta data. Não exportar hash a clientes.

Escala: agregado JSON é primeira versão; normalizar tabelas, índices, histórico e paginação antes de grandes volumes. SQLite em disco local persistente; não replicar este servidor sobre bancos separados. Anexos com assinatura básica, não antivírus. APIs internas não substituem API pública versionada/tokenizada de futuras integrações.

Documentação técnica de referência: https://nodejs.org/download/release/latest-v24.x/docs/api/sqlite.html e https://nodejs.org/docs/latest-v24.x/api/crypto.html. Para integração bancária/API: adicionar adaptadores com escopos, idempotência, logs sem segredos e webhooks autenticados; tarefa futura.
