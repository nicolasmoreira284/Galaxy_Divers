# Histórico de alterações

Todas as mudanças importantes do **Galaxy Divers** ficam registradas aqui.
O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e as versões seguem o [Versionamento Semântico](https://semver.org/lang/pt-BR/).

Para ver cada mudança linha a linha, veja a [lista de commits](https://github.com/nicolasmoreira284/Galaxy_Divers/commits/main).

## [Não lançado]

Nada por enquanto.

## [1.3.0] - 2026-11-13

### Alterado
- **Alcance dos tiros reduzido**, para não ser possível ficar num canto do mapa atirando de longe:
  - tiro normal do jogador: de cerca de 880 px para cerca de 500 px;
  - Rajada Tripla: de cerca de 1.260 px para cerca de 700 px;
  - Laser: de 1.000 px para 650 px;
  - Esfera de Plasma: alcance máximo de 1.100 px para 650 px;
  - tiros dos inimigos: de cerca de 1.100 px para no máximo cerca de 800 px. Os da nave pesada e os do chefe mantêm alcance suficiente para o leque e o anel.

### Adicionado
- **SEO e divulgação do site:** `robots.txt`, `sitemap.xml`, tag canônica, dados estruturados de jogo (JSON-LD), descrição na página do jogo e imagem de pré-visualização (`og.jpg`) com metadados Open Graph e Twitter.
- Este histórico de alterações e o guia técnico em `docs/DESENVOLVIMENTO.md`.

## [1.2.0] - 2026-11-13

### Adicionado
- **Dois modos de jogo** escolhidos pelo endereço: `?modo=pc` e `?modo=celular` (sem o parâmetro, o jogo detecta o aparelho).
- **Landing page com duas opções de jogar:** "Jogar no PC" e "Jogar no celular".
- **Controles do celular personalizáveis** (Pausa > Editar controles): arrastar cada botão, tamanho dos botões (50% a 180%) e do joystick (60% a 160%), sensibilidade do giro (0,6x a 4x, padrão 1,8x), **auto-mira** ao atirar, **modo canhoto** e botão de restaurar. Tudo fica salvo no aparelho.
- Capturas de tela dos controles do celular.

### Alterado
- **Desempenho:** nebulosa de fundo pré-renderizada, resolução do canvas limitada a 1,5x no celular, HUD que só atualiza quando algo muda, minimapa menor e redesenhado a cada 2 quadros, menos efeitos de brilho e partículas no celular, passos de simulação fixos e **redução automática de qualidade** quando a taxa de quadros cai.
- O layout dos botões de toque passou a ser calculado pelo código, e não mais fixo no CSS.

## [1.1.0] - 2026-11-13

### Corrigido
- **Joystick do celular:** a nave só andava para cima, porque o centro do joystick ficava deslocado do ponto do toque. O movimento agora é medido a partir do ponto em que o dedo toca.

### Alterado
- **Celular na horizontal:** HUD, botões, menu, pausa, seleção de fases e Hangar compactos em telas baixas.
- Visão do jogo afastada em celulares (zoom), para mostrar mais do mapa.
- **Tela cheia** automática ao iniciar a partida no celular, com tentativa de travar na horizontal.
- Meta de `viewport` para celulares e botões de toque maiores no toque.

## [1.0.0] - 2026-11-13

Primeira versão completa, publicada no site.

### Adicionado
- **Visual pixel art:** espaço escuro com nebulosa, órbitas e estrelas coloridas; fontes pixeladas (Press Start 2P e Pixelify Sans); painéis e botões chanfrados.
- **Nave do jogador** branca e vermelha em sprite pixel art, e **inimigos** (caça, interceptador e pesada) em pixel art, tudo gerado por código.
- **Chefe "Devorador" na onda 15**, com barra de vida, leques e anéis de projéteis, fúria abaixo de 50% da vida e reforços.
- **Seleção de fases** com 8 vagas (só a Fase 1 disponível).
- **3 vidas**, com renascimento protegido, e tela de **Game Over** com XP e melhores partidas.
- **Reiniciar partida** na pausa.
- **Tabela de recordes locais** (10 melhores) e tela **Recordes** no menu.
- **Nível de piloto** (XP igual aos pontos, até o nível 30) que libera pinturas da nave (Cobalto 2, Esmeralda 3, Solar 5, Fantasma 8).
- **Teclas personalizáveis**, no menu e na pausa.
- **Volume** ajustável e botão de mudo, no menu e na pausa.
- **Botão Controles** na pausa.
- Botão de pausa (II) e vibração ao levar dano no celular.
- **Landing page** em `site/`, configuração do Firebase Hosting e script `scripts/capturar-telas.js`.
- Documentação: README reescrito com capturas de tela atualizadas.

### Alterado
- Ícone do casco passou a ser a silhueta da nave.
- O repositório foi renomeado no GitHub para `Galaxy_Divers`, e os links foram atualizados.

## [0.3.0] - 2026-11-11

### Adicionado
- **Menu principal** com Jogar, Naves e Controles.
- **Hangar** com 5 pinturas da nave e prévia animada.

### Alterado
- O jogo passou a se chamar **Galaxy Divers** (antes, Space Dodger), no jogo, no README e no banner.

## [0.2.0] - 2026-11-09

### Adicionado
- README com banner, capturas de tela e guia do jogo.

## [0.1.0] - 2026-11-09

Primeira publicação, ainda com o nome **Space Dodger**.

### Adicionado
- Jogo de combate espacial em HTML5 Canvas e JavaScript puro, em um único arquivo, com movimento livre em 360° e inércia.
- Controles: WASD para mover, mouse para mirar e atirar, `C` para a manobra lateral e `Shift` para o boost.
- Asteroides que ferem jogador e inimigos.
- Inimigos vermelhos e pretos: caça, interceptador (com investida avisada) e pesada.
- Armas especiais com recargas independentes: Esfera de Plasma (destrói asteroides), Laser (atordoa) e Rajada Tripla, trocadas pelo scroll do mouse.
- **Oficina** entre as ondas, com ícones, preços e dicas ao passar o mouse (casco, eficiência de energia, motores, recarga especial, reparo e armas).
- HUD com ícone do casco (verde, amarelo e vermelho) e ícone da arma selecionada.
- Combo, bônus de esquiva, efeitos sonoros sintetizados e recorde salvo no navegador.
- Controles de toque para celular.

[Não lançado]: https://github.com/nicolasmoreira284/Galaxy_Divers/compare/main...HEAD
[1.3.0]: https://github.com/nicolasmoreira284/Galaxy_Divers/commit/dd7bee2
[1.2.0]: https://github.com/nicolasmoreira284/Galaxy_Divers/commit/dd7a548
[1.1.0]: https://github.com/nicolasmoreira284/Galaxy_Divers/commit/ba6b84b
[1.0.0]: https://github.com/nicolasmoreira284/Galaxy_Divers/commit/ed75b92
[0.3.0]: https://github.com/nicolasmoreira284/Galaxy_Divers/commit/a275b4e
[0.2.0]: https://github.com/nicolasmoreira284/Galaxy_Divers/commit/dca5c67
[0.1.0]: https://github.com/nicolasmoreira284/Galaxy_Divers/commit/b426038
