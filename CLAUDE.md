# YU.MED — Orientações para edição

Este é o código completo de um site odontológico aprovado pelo usuário. O projeto usa HTML, CSS e JavaScript puro, sem dependências de produção e sem build. A pasta `dist` contém o código-fonte que deve ser editado; ela não é um artefato descartável neste projeto.

## Arquivos principais

- `dist/index.html`: página, quatro seções, cabeçalho em cápsula, mapa de demonstração e diálogos.
- `dist/styles.css`: estilos e responsividade. A parte final contém os ajustes mais recentes de desktop, cabeçalho e remoção da numeração. Considere a cascata ao editar.
- `dist/app.js`: destaques, comparadores de antes/depois, menu, galeria e formulário de demonstração.
- `dist/assets/`: imagens, fontes e favicon locais.
- `index.html`: entrada do GitHub Pages, redireciona para `dist/index.html`. Preserve os caminhos relativos, porque o Pages publica sob `/yumed-odontologia/`.
- `scripts/dev-server.mjs`: prévia local com recarga ao salvar; não é usado em produção.
- `.openai/hosting.json`: identifica a publicação anterior no Sites. Não é necessário para o GitHub Pages.

## Executar e verificar

Use Node.js 20 ou superior. Não há dependências a instalar.

- `npm run dev`: abre um servidor em `http://localhost:8080`, com recarga ao salvar arquivos em `dist`.
- `npm run check`: verifica a sintaxe dos scripts.
- A pasta também pode ser aberta por `ABRIR-SITE.html` sem servidor, com atualização manual do navegador.

Se houver navegador disponível, confira desktop e celular, especialmente 360, 390, 768, 1024 e 1440px. Verifique menu, comparadores, galeria, formulário, ausência de rolagem horizontal e contraste. Não declare uma revisão visual que não tenha executado.

## Direção aprovada

- Preservar fotos existentes, azul-petróleo, marfim, tipografia serifada com itálico e transparências, exceto se o usuário solicitar mudanças.
- Desktop tem hero alta, texto mais à esquerda e seções alongadas. O usuário gostou do celular; preservar o equilíbrio da versão mobile.
- Ordem: abertura, tratamentos, sorrisos/tecnologia, clínica. Contato e mapa ficam no rodapé.
- A numeração decorativa foi removida. Os indicadores da hero continuam funcionando sem números.
- Não inventar depoimentos, pacientes reais, estatísticas ou contatos. As imagens de antes/depois e o mapa são demonstrativos e devem permanecer identificados até receber materiais reais.
- O formulário não envia dados nem reserva horários. Não simular sucesso de uma integração que não existe.

## Atualizações online

O repositório é `https://github.com/Ikyy1/yumed-odontologia`.
A publicação automática usa o GitHub Pages com **Deploy from a branch → main → /(root)**. A ativação inicial precisa ser concluída nas configurações do GitHub.

Depois de ativado, cada commit enviado à `main` gera uma nova publicação. Alterar arquivos somente no notebook atualiza a prévia local; para publicar, é necessário commit e push. A publicação pode levar alguns minutos. O endereço do GitHub Pages é separado da publicação anterior no Sites, que não é sincronizada automaticamente por este repositório.

Se forem usadas branches ou pull requests, a versão pública muda após a entrada das alterações na `main`. Não crie outro projeto do Sites para este fluxo.
