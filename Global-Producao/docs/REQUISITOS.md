# Requisitos e decisões confirmadas

## Objetivo e limites
Sistema novo, independente, vazio, personalizável, com código e documentação para outra empresa continuar. Sistema antigo estritamente fora do escopo. Primeira versão valida fluxo; tabela automática de preços, banco/boletos e NF ficam fora. PDF de apresentação posterior à validação do usuário.

## Dez perfis
1. Cliente: somente pedidos da própria empresa; solicita, aceita preço/prazo/processo, responde pendências e primeira peça.
2. Administrador: cadastros, permissões, todas as telas e ações; ajustes de prazo/valor/observações; cancelamento de demonstrativo; backup/restauração.
3. Arte-finalista: parecer técnico pré-aceite; produz/anexa/libera layout; marca aprovação por foto; registra resposta externa por WhatsApp/e-mail.
4. Expedição/Recepção: recebido/aguardando; volumes de chegada; imprime identificação; filtra embalados; marca retirado.
5. Líder de desembalagem: fila, andamento, pendências e resposta do cliente; direciona verbalmente a equipe, não dá conferido por perfil de líder.
6. Produção: auxiliares tanto na desembalagem quanto na embalagem. Digitam número, iniciam, pausam com motivo, retomam, registram ajudantes e concluem. A etapa disponível determina a ação, impedindo embalamento antecipado.
7. Líder de gravação: fila do setor, distribuição entre gravadores, aprovações e andamento.
8. Gravador: pedido atribuído, início, primeira peça, espera por aprovação, baixas parciais/completas, ajudantes e pausas.
9. Líder de embalagem: fila e andamento; direciona auxiliares. Baixa pelo perfil Produção.
10. Financeiro: análise comercial e proposta, preços/descontos/prazos, seleção manual/todos por cliente, ajuste final e emissão sem reaprovação. Cancelamento do demonstrativo somente administrador.

Perfis internos podem acumular funções. Cliente não pode acumular perfil interno, para evitar quebra do isolamento. Setores limitam gravadores e líderes de gravação. Contas autenticadas por login e senha próprios, sem e-mail obrigatório. Cadastros podem ser inativados preservando histórico.

## Fluxo
### Solicitação e análise
- Um item/processo por pedido. Kits e peças com múltiplos processos são entradas separadas; referência do cliente permite correlação.
- Cliente informa material, quantidade, processo obrigatório, prazo desejado >=3 dias úteis, observações e opção de primeira peça por foto. Anexa referência depois de criar.
- Financeiro/administrador analisa valor total manual, prazo e processo. Arte-final pode registrar impossibilidade e sugerir processo antes do aceite.
- Cliente aprova pacote preço/prazo/processo. Em seguida arte e recepção recebem simultaneamente.
### Preparação
- Recepção registra chegada e volumes, sem conferir defeitos/quantidades.
- Arte-final anexa e libera layout internamente; não há aprovação rotineira de layout pelo cliente.
- Ambos enxergam os dois requisitos. Conferência liberada somente quando material recebido e layout liberado.
### Desembalagem
- Auxiliar inicia; registra faltas/defeitos, fotos, quantidade afetada.
- Pendência vai diretamente para o cliente no sistema, sem pré-liberação do líder.
- Cliente aceita, autoriza quantidade menor, solicita troca ou promete envio.
- Autorização não dá conferido automaticamente. Funcionário retoma e conclui.
- Quantidade original, encontrada, autorizada e extras preservadas. Extras são reserva para perdas, sem cobrança automática.
- Troca/envio permanecem pendentes até registro da solução material.
### Gravação
- Líder atribui a gravador. Gravador inicia e registra primeira peça.
- Exigência vem do cliente e é confirmada pela arte. Pedido com exigência não permite prosseguir antes de resposta.
- Cliente aprova no sistema; arte pode registrar aprovação externa e comprovante anexo.
- Reprovação exige nova foto. Retomada é explícita.
- Baixa completa segue diretamente à fila de embalagem.
### Embalagem e retirada
- Auxiliar registra início, ajudantes e volumes finais. Volumes de entrada permanecem separados.
- Conclusão gera disponível para retirada e aviso na área do cliente, além de elegibilidade financeira.
- Recepção marca retirado, registra usuário e horário automaticamente, arquiva nas telas históricas. Não exige preencher nome do retirante no sistema.
### Impressões
- Meia A4 por via: layout e caixa (duas por A4), com dados, quantidade sem palavra previsto, volumes recebidos.
- Reimpressão permite cópias adicionais para caixas.
- Via de entrega separada quando pronto, volumes finais, nome/data/assinatura em papel.
### Faturamento
- Disponível ao ficar embalado. Retirada e cobrança independentes.
- Seleção individual/todos por cliente, totais de pedidos combinados, ajuste por financeiro/admin com motivo.
- Demonstrativo sem NF/boleto; emitidos saem da lista financeira, novos prontos entram para próximo fechamento.
- Admin cancela com motivo e pedidos voltam a faturar. Histórico preservado.
### Controle de produção
- Registro servidor de início, pausas com motivo, retomada, conclusão e participantes.
- Tempo ativo separado de pausa. Uma atividade ativa por funcionário.
- Período, funcionário (responsável ou ajudante), setor e etapa. CSV e resumo por responsável/setor; média por dias com atividade.
- Ajudantes não duplicam quantidade. Soma entre etapas é operação processada, não quantidade física única.

## Decisões de implementação a validar
- Baixa parcial segura: mantém saldo na mesma etapa; não libera lote para etapa seguinte até completar quantidade autorizada. Encaminhamento simultâneo de lotes exige desenho adicional.
- Cadastro de feriados manual; dias úteis excluem sábado/domingo e feriados cadastrados.
- Avisos nesta versão são internos, vistos no portal. Notificações push/celular, e-mail e WhatsApp automáticos ainda exigem integração.
- Referência correlaciona kit/múltiplos processos, mas não impõe dependência entre pedidos; roteamento físico entre processos deve ser validado antes de uso real.
- Perdas específicas de gravação e consumo de reservas ainda precisam de regra detalhada, não inventar cálculo financeiro automático.
- Correções excepcionais de etapa/quantidade após faturamento não têm editor genérico. As ações operacionais usuais estão disponíveis ao administrador; alterar saldos históricos exige fluxo de estorno a definir.
