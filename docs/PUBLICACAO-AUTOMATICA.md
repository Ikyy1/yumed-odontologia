# Ativar atualizações automáticas

A integração usada nesta conversa consegue enviar o código, mas o GitHub recusou a ativação do Pages por API. Esta configuração precisa ser feita uma vez pelo dono do repositório.

1. Abra https://github.com/Ikyy1/yumed-odontologia/settings/pages
2. Em **Build and deployment**, escolha **Source: Deploy from a branch**.
3. Escolha a branch **main** e a pasta **/(root)**.
4. Clique em **Save** e aguarde a publicação.
5. Use o endereço exibido pelo próprio GitHub Pages para apresentar o site aos clientes.

Depois dessa ativação, qualquer commit enviado à `main` atualiza o site automaticamente, após a conclusão da publicação. Não precisa subir os arquivos manualmente a cada alteração.

## Trabalhar com o Claude Code

Baixe a versão atual do repositório em **Code → Download ZIP**, extraia em Documentos e abra a pasta no Claude Code. O arquivo `CLAUDE.md` explica o projeto.

Para editar com histórico Git e enviar atualizações com mais facilidade, clone o repositório em vez de baixar um ZIP:

```sh
git clone https://github.com/Ikyy1/yumed-odontologia.git YU.MED
cd YU.MED
npm run dev
```

Após revisar uma alteração:

```sh
npm run check
git add .
git commit -m "Ajusta o site"
git push origin main
```

O site anterior no Sites continua em seu endereço próprio. Para acompanhar automaticamente as mudanças feitas no GitHub, utilize o endereço exibido nas configurações do GitHub Pages.
