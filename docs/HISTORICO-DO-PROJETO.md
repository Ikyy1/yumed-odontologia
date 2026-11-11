# YU.MED — Odontologia & Bem-estar

Site demonstrativo em português, inspirado na imagem de referência enviada. A interface contém quatro seções: abertura, tratamentos, sorrisos e tecnologia, e clínica. HTML, CSS e JavaScript, sem dependências de produção ou etapa de compilação.

## Arquivos

- `dist/index.html`: estrutura, navegação e diálogos.
- `dist/styles.css`: identidade visual, componentes e versões responsivas.
- `dist/app.js`: menu, destaques, tratamentos, galeria e formulário demonstrativo.
- `dist/assets/`: imagens WebP, fontes locais e ícone.
- `.openai/hosting.json`: identificação e configuração estática do Sites.

## Executar

Na pasta do projeto, execute `python3 -m http.server 8080 --directory dist` e abra `http://localhost:8080` no navegador. Para apenas visualizar, também é possível abrir `dist/index.html` diretamente.

## Referência e materiais

A imagem recebida orienta a ordem das seções, as proporções entre fotos e texto, os títulos serifados com itálico, a paleta azul-petróleo e marfim, as cápsulas, os cards e as sobreposições translúcidas. Cormorant Garamond e Manrope são aproximações tipográficas. As imagens foram geradas para esta demonstração e não representam uma clínica real. O card de apresentação abre uma imagem do ambiente; não há vídeo fornecido.

O nome YU.MED foi preservado como nome provisório da referência. Estatísticas e resultados não verificados foram substituídos por princípios de atendimento. O site está marcado como demonstração e desabilita indexação por buscadores.

## Funcionalidades

Navegação por âncoras; menu acessível; três destaques editoriais; faixa de tratamentos com setas, toque e detalhes; apresentação ilustrativa do ambiente; diálogos com fechamento por Escape; formulário com validação e revisão local. As preferências são apagadas ao fechar o formulário.

Não existe envio de formulário, reserva de horário, integração com WhatsApp, rastreamento ou armazenamento dos dados do visitante. A revisão informa isso expressamente. O formulário deve ser integrado antes do uso em produção real.

## Dados para versão definitiva

Nome e logotipo oficiais, contatos, endereço, horários, fotos reais, apresentação da equipe, registros profissionais, procedimentos efetivamente disponíveis e definição do sistema de agendamento. Nenhum telefone fictício ou contato inventado foi usado em links.

## Verificação e limitações

A checagem de sintaxe JavaScript e a validação estrutural dos arquivos foram executadas. Há verificação em DOM simulado das interações e da revisão do agendamento. Esta verificação não substitui um navegador.

A ferramenta `cua_repl.js`, exigida pelo fluxo de prévia gerenciada do Sites, não está disponível neste ambiente. Por isso não foram executados servidor de prévia, capturas de tela ou testes visuais em navegador. A responsividade foi implementada, mas a conferência visual nas larguras 360, 390, 768, 1024 e 1440px permanece pendente.

O starter e o helper de repositório do plugin não estão montados no ambiente. Foi adotada a opção estática sem build e a preparação do repositório por Git com credencial temporária somente em memória.

A publicação depende da autorização expressa solicitada pelo prompt enviado. A primeira versão foi preparada para salvar no Sites com acesso privado.

## Atualização — terceira seção

Uma nova seção 03, entre tratamentos e clínica, reúne três comparações de sorrisos com divisores acessíveis por toque, mouse e teclado, ampliação das três comparações e um bloco sobre tecnologia com imagem do consultório e detalhe circular. A clínica anterior passa a ser a seção 04. O item Tecnologia da navegação aponta para o novo bloco; o menu também permite acessar os sorrisos.

Os exemplos de antes/depois são explicitamente identificados como simulações geradas e não documentam pacientes ou resultados clínicos. O conteúdo sobre recursos tecnológicos permanece ilustrativo até confirmação da estrutura real da clínica. As duas novas imagens foram geradas para este layout. O botão de ampliação do consultório usa a galeria existente, preservando a apresentação da recepção quando os outros botões são usados.

A atualização foi autorizada para publicação privada na mesma audiência já aprovada.

## Atualização — enquadramento no computador

A partir de 1001px, a página aproveita a largura da janela, a hero passa a ter altura mínima de uma tela e o conteúdo principal fica em uma coluna mais central, seguindo as proporções da segunda referência enviada. A fotografia existente foi reenquadrada e os elementos de apoio receberam mais espaço. Tratamentos, sorrisos/tecnologia e clínica ganharam alturas proporcionais à janela e mais espaçamento vertical.

As alterações foram restritas a um bloco CSS para desktop. Os arquivos de imagem, as cores, o conteúdo, os comportamentos e todas as regras aplicadas até 1000px foram preservados. A limitação de revisão visual em navegador descrita acima continua válida neste ambiente.

## Atualização — cabeçalho, posição da hero e mapa

O texto da hero no computador foi movido para a esquerda, em um contêiner mais largo, preservando a fotografia e as alturas ampliadas. O cabeçalho agora usa uma barra clara em cápsula, com marca à esquerda, navegação central e botão de agendamento à direita. Até 1100px, a navegação usa o menu expansível; no celular, o cabeçalho fica compacto e mantém a ação principal da hero.

A área de contato inclui um mapa incorporado do Google Maps, um link para abri-lo e uma localização de demonstração na região da Avenida Paulista, São Paulo. Essa localização é explicitamente ilustrativa e não representa o endereço real da clínica. Não foram inventados telefone ou e-mail. O menu Contato e a navegação móvel apontam para esta área; o agendamento continua demonstrativo. O aviso de privacidade informa a incorporação do serviço externo.

O endpoint do mapa respondeu HTTP 200. As verificações de estrutura, links e interações em DOM simulado passaram. A revisão visual no navegador continua pendente pela indisponibilidade da ferramenta exigida pelo fluxo de prévia do Sites.

## Atualização — numeração decorativa

Removidos os números decorativos dos cabeçalhos das seções e do menu. Os destaques da hero agora usam indicadores discretos sem números, mantendo os três conteúdos e a navegação acessível.
