# YU.MED — Site de odontologia

Cópia completa e editável da versão aprovada, com layout responsivo, quatro seções, menu em cápsula, comparações interativas e mapa ilustrativo.

[Ver o site](https://yumed-odontologia-care.smart-siren-9704.chatgpt.site)

## Salvar no notebook

1. Baixe o arquivo **YU.MED.zip** na área **Releases** deste repositório.
2. Extraia a pasta **YU.MED** dentro de **Documentos**.
3. Abra **ABRIR-SITE.html** para visualizar a cópia local.

Também é possível baixar todo o repositório em **Code → Download ZIP**.

## Arquivos do projeto

- `dist/index.html`: conteúdo, seções, menu, mapa e formulários.
- `dist/styles.css`: aparência e adaptação para celular e computador.
- `dist/app.js`: interações, comparações e formulário demonstrativo.
- `dist/assets/`: fotos, fontes e ícone, incluídos no projeto.
- `.openai/hosting.json`: identificação e hospedagem do site original no Sites.
- `docs/HISTORICO-DO-PROJETO.md`: histórico das decisões e alterações.
- `docs/licencas/`: licenças das fontes locais.
- `docs/COMO-RENOMEAR.md`: como mudar o nome do repositório, da pasta e da clínica depois.

## Executar com servidor local

O site não precisa de instalação ou compilação. Para servir por HTTP, na pasta do projeto execute:

```sh
python3 -m http.server 8080 --directory dist
```

No Windows, se o comando acima não estiver disponível, use:

```powershell
py -m http.server 8080 --directory dist
```

Depois, abra `http://localhost:8080`.

## Usar como demonstração para clientes

As imagens e a localização são ilustrativas. O agendamento organiza uma prévia na tela e não envia solicitações nem reserva horários. O mapa usa o Google Maps e precisa de internet.

Antes de usar para atendimento real, substitua nome, endereço, contatos e equipe pelos dados confirmados do cliente e conecte o agendamento. O arquivo HTML contém a marcação de demonstração e a diretiva `noindex`.

O acesso ao site publicado no Sites é configurado separadamente da privacidade deste repositório. Este repositório é um backup privado do código e não publica um novo site automaticamente.

## Origem da cópia

Versão exportada do commit `da09e5c77a8494d4c955b1f7a2fceac478326f60` do projeto original. A pasta `dist` foi copiada sem alterações.
