# Galaxy Divers

Jogo de combate espacial em pixel art, em um único arquivo: `space-dodger.html`.

## Estrutura
- `space-dodger.html`: o jogo (fonte da verdade).
- `README.md`: documentação.
- `site/`: landing page para o Firebase Hosting (`index.html`), com o jogo copiado em `site/jogo/index.html` e imagens em `site/assets/`.
- `assets/`: banner e capturas de tela usados no README (devem ser idênticos aos de `site/assets/`).
- `scripts/capturar-telas.js`: copia o jogo para `site/jogo/index.html` e refaz as capturas de tela em `assets/` e `site/assets/`
  (`node scripts/capturar-telas.js`, precisa do Chrome ou do Edge; defina `CHROME_PATH` se não achar).
- `firebase.json` e `.firebaserc`: Hosting do projeto `galaxy-divers`.

## Documentação
Quando o usuário pedir para atualizar a documentação (ou usar `/atualizar-docs`), atualize o README, a landing page
(textos, `title`, `meta`, `og:*`), o banner e as capturas conforme o código do jogo. Use `scripts/capturar-telas.js` para as imagens.
Não faça commit, push nem `firebase deploy` sem o usuário pedir.
