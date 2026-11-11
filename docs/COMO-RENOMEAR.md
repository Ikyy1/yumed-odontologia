# Como mudar os nomes depois

## Nome do repositório no GitHub

No repositório, abra **Settings → General → Repository name**, escreva o novo nome e clique em **Rename**.

O nome da pasta baixada e a marca mostrada no site são configurações separadas. Você pode renomear a pasta `YU.MED` no notebook pelo Explorador de Arquivos ou Finder.

## Nome da clínica mostrado no site

Edite os textos de marca em `dist/index.html`: título da página, metadados, cabeçalho, menu, apresentação da clínica e rodapé. O texto `YU.MED` também aparece no conteúdo de demonstração em `dist/app.js`.

O ícone do navegador fica em `dist/assets/favicon.svg`. As fotografias não precisam ser trocadas para alterar o nome escrito como texto na interface.

## Endereço e atendimento

A localização atual está identificada como ilustrativa. Atualize o texto do endereço e a busca do Google Maps no bloco `#contato` de `dist/index.html` quando tiver os dados reais.

O formulário atual não envia pedidos. Conecte o canal de atendimento real antes de oferecer agendamento aos pacientes.
