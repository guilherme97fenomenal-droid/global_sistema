# Checkpoint — 22/10/2026 — independente v0.2.0

Usuário Gui pediu sistema novo, sem tocar no antigo, e login/senha próprios sem e-mail. A v0.1 hospedada via Sites usa autenticação ChatGPT obrigatória. Por isso a v0.2 é OUTRA aplicação, local/portável para futura hospedagem independente. Não publicar esta autenticação no Sites, não alterar o sistema antigo e não dizer que o link de demonstração já usa o novo login.

Código local: /workspace/global-independente. Artefato ZIP reúne fonte, aplicação compilada, iniciador Windows e documentação. Nenhum cadastro real nem senha padrão. Primeiro administrador criado por CLI com senha oculta no computador/servidor do usuário.

Implementado: tela de login; cadastro sem e-mail com login/senha; perfis e setores mantidos; botão Sair; sessões no servidor; senha hash scrypt; revogação na redefinição/inativação/alteração de acesso; proteção de origem; limite de tentativas; fluxo original, anexos, backup e impressão preservados. Banco D1/R2 convertido em SQLite/arquivos locais.

Validação realizada: testes de domínio e integração HTTP com servidor real e base temporária, incluindo cadastro sem e-mail, setor, acesso indevido, redefinição, senha antiga, logout, ausência de hash/senha em API/backup e proteção de origem. Build Vite. Teste visual autenticado e experiência do iniciador Windows no computador do usuário ainda precisam de validação. Nenhuma senha real do usuário foi utilizada.

Próximo passo: usuário extrair ZIP, instalar Node24 e executar INICIAR_WINDOWS.cmd. Depois validar o fluxo com cadastros de teste. Hospedagem ainda não escolhida. Explicar que localhost é apenas computador local, não serviço online. Regras originais detalhadas em REQUISITOS; substituir referências anteriores de identidade ChatGPT pelas regras desta versão. PDF explicativo solicitado somente após homologação.
