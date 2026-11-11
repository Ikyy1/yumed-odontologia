# Atualizações automáticas ativas

O GitHub Pages já está ativado e publica a branch **main**, pasta **/(root)**.

**Site:** https://ikyy1.github.io/yumed-odontologia/

Cada commit enviado à `main` gera uma nova publicação. Aguarde a conclusão do processo no menu **Actions** do repositório; isso pode levar alguns minutos. Salvar arquivos somente no notebook atualiza a prévia local, mas a atualização online depende de commit e push.

Se a configuração precisar ser refeita, abra https://github.com/Ikyy1/yumed-odontologia/settings/pages e selecione **Deploy from a branch → main → /(root)**.

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
