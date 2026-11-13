# Guia de desenvolvimento

Este guia é para quem quer entender, alterar ou publicar o **Galaxy Divers**.
Para jogar, veja o [README](../README.md). Para saber o que mudou em cada versão, veja o [histórico de alterações](../CHANGELOG.md).

## Estrutura do repositório

| Caminho | O que é |
|---|---|
| `space-dodger.html` | **O jogo inteiro** (HTML, CSS e JavaScript em um único arquivo). É a fonte da verdade |
| `README.md` | Apresentação e guia do jogador |
| `CHANGELOG.md` | Histórico de alterações por versão |
| `docs/DESENVOLVIMENTO.md` | Este guia |
| `site/` | Landing page para o Firebase Hosting |
| `site/jogo/index.html` | Cópia de `space-dodger.html` servida em `/jogo/` |
| `site/assets/` | Imagens da landing page (capturas, banner e `og.jpg`) |
| `site/robots.txt`, `site/sitemap.xml` | Arquivos para os buscadores |
| `assets/` | Banner e capturas usados no README (iguais aos de `site/assets/`) |
| `scripts/capturar-telas.js` | Copia o jogo para `site/jogo/` e refaz as capturas de tela |
| `firebase.json`, `.firebaserc` | Configuração do Hosting do projeto `galaxy-divers` |
| `CLAUDE.md` | Instruções para o assistente que ajuda no projeto |

## Como rodar

Não há instalação nem build. Abra o `space-dodger.html` no navegador (Chrome, Edge, Firefox ou Safari).

O endereço aceita um parâmetro para escolher o modo de controles:

| Endereço | Efeito |
|---|---|
| `space-dodger.html` | Detecta o aparelho sozinho (toque ou mouse) |
| `space-dodger.html?modo=pc` | Força teclado e mouse |
| `space-dodger.html?modo=celular` | Força os controles de toque (serve para testar no computador) |

As fontes pixeladas vêm do Google Fonts, então a primeira abertura precisa de internet. Sem conexão, entra uma fonte comum.

## Como o jogo é organizado

Tudo roda dentro de uma função anônima no final do arquivo. As partes, na ordem em que aparecem:

1. **CSS e HTML:** o tema pixel, o HUD, a camada de toque e as telas (`#menu`, `#skinsScr`, `#ctrlScr`, `#levelScr`, `#scoresScr`, `#pause`, `#shop`, `#over`).
2. **Constantes e dados:** `WORLD` (mundo de 4000 px), `TYPES` (inimigos), `UPS` e `UNLOCKS` (Oficina), `SKINS` (pinturas), armas (`ORB_*`, `LASER_*`, `TRIPLE_CD`), dardo (`DART_*`).
3. **Estado:** a variável `state` guarda a tela atual: `menu`, `play`, `pause`, `shop`, `dying` ou `over`. A função `reset()` cria uma partida nova.
4. **Entrada:** teclado com teclas trocáveis (`BIND_DEF`), mouse e toque (joystick flutuante e botões personalizáveis).
5. **Áudio:** efeitos sintetizados com a Web Audio API, sem arquivos de som. O volume tem um controle mestre.
6. **Telas e fluxo:** `showScreen()`, `start()`, `openShop()`, `nextWave()`, `gameOver()`.
7. **Simulação:** `update(dt)` move a nave, os inimigos, os tiros, os asteroides e os itens, e trata colisões e ondas.
8. **Sprites:** um pequeno rasterizador (`raster()`) desenha polígonos e elipses em pixels, sem anti-aliasing, e guarda o resultado em cache (`getSprite()`).
9. **Desenho:** `render()` desenha o fundo, o mundo e os indicadores; `renderMinimap()` e `updateHud()` cuidam do restante.
10. **Laço principal:** `frame()` usa `requestAnimationFrame`, passos de simulação fixos e a redução automática de qualidade.

## Regras do jogo (valores atuais)

| Assunto | Valor |
|---|---|
| Vidas | 3, com 2,5 s de proteção ao renascer |
| Casco e energia iniciais | 100 e 100 |
| Chefe | onda 15, 220 de vida, 5.000 pontos |
| Combo | sobe a cada 4 abates, máximo x5 |
| XP de piloto | igual aos pontos da partida. Nível 2 exige 1.000 XP e cada nível seguinte pede 500 a mais, até o nível 30 |
| Pinturas | Rebelde nível 1, Cobalto 2, Esmeralda 3, Solar 5, Fantasma 8 |
| Alcance dos tiros | jogador ~500 px, Rajada Tripla ~700 px, Laser 650 px, Plasma até 650 px, inimigos até ~800 px |
| Recarga das armas | Plasma 14 s, Laser 12 s, Rajada Tripla 9 s |

Os preços e níveis da Oficina estão em `UPS` e `UNLOCKS`. Quando mudar algum valor, atualize também o README e a landing page.

## O que é salvo no navegador

Tudo fica no `localStorage`, sem servidor:

| Chave | Conteúdo |
|---|---|
| `spaceDodgerHi` | Maior pontuação |
| `galaxyDiversScores` | As 10 melhores partidas (pontos, onda, abates e data) |
| `galaxyDiversXp` | XP total de piloto |
| `galaxyDiversSkin` | Pintura escolhida |
| `galaxyDiversKeys` | Teclas personalizadas |
| `galaxyDiversVol`, `galaxyDiversMute` | Volume e mudo |
| `galaxyDiversTouch` | Controles do celular (tamanhos, sensibilidade, canhoto, auto-mira e posições) |

## Desempenho

- A resolução do canvas é limitada (`DPRMAX`: 2 no computador, 1,5 no celular).
- A nebulosa de fundo é pré-renderizada uma vez (`getNeb()`).
- O HUD só mexe no DOM quando o valor muda (`chg()`).
- O minimapa é redesenhado a cada 2 quadros.
- Se a média de quadros passar de cerca de 27 ms durante uma partida, `degrade()` reduz a resolução e o limite de partículas (`PCAP`), em até 2 níveis.

## Como adicionar coisas

- **Nova pintura:** inclua um item em `SKINS` (cores `hull`, `shade`, `acc`, `glow`, `flame`) e o nível em `SKIN_LV`.
- **Novo inimigo:** inclua em `TYPES`, crie o sprite em `enemySprite()`, trate o comportamento no laço de inimigos em `update()` e a composição em `startWave()`.
- **Nova arma especial:** inclua em `UNLOCKS` e em `WICON`/`WNAME`, e trate o disparo em `fireSpecial()`.
- **Nova fase:** a tela de seleção (`buildLevels()`) já tem 8 vagas. Hoje só a Fase 1 inicia uma partida.

## Publicar uma nova versão

1. Altere o `space-dodger.html` e teste no navegador (inclusive no modo celular).
2. Atualize a documentação: README, landing page (`site/index.html`), capturas e **este histórico** (`CHANGELOG.md`).
   Rode `node scripts/capturar-telas.js` para refazer as capturas e copiar o jogo para `site/jogo/` (precisa do Chrome ou do Edge).
3. Faça o commit e envie ao GitHub:
   ```bash
   git add -A
   git commit -m "Descreva a mudança"
   git push origin main
   ```
4. Publique o site:
   ```bash
   firebase deploy --only hosting
   ```

Endereços: o site fica em https://galaxy-divers.web.app e o jogo em https://galaxy-divers.web.app/jogo/.

## Testes

Não há suíte de testes automatizados. A verificação é manual no navegador e, quando preciso, por scripts que acionam o jogo por dentro (os ganchos usados em `scripts/capturar-telas.js` mostram como). Vale conferir sempre: menu, partida, pausa, Oficina, Game Over, recordes e os dois modos (PC e celular).
