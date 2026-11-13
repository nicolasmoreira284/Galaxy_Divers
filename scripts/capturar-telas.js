// Gera as capturas de tela do jogo e sincroniza a cópia usada pela landing page.
// Uso (na raiz do projeto):  node scripts/capturar-telas.js
// Faz:
//   1. copia space-dodger.html para site/jogo/index.html
//   2. tira as capturas (menu, fases, naves, batalha, boss, oficina) com o Chrome/Edge em modo headless
//   3. salva os PNG em assets/ e site/assets/
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { pathToFileURL } = require('url');

const root = process.cwd();
const gameFile = path.join(root, 'space-dodger.html');
if (!fs.existsSync(gameFile)) { console.error('Rode na raiz do projeto (space-dodger.html não encontrado).'); process.exit(1); }

// 1. cópia do jogo para a landing page
fs.mkdirSync(path.join(root, 'site', 'jogo'), { recursive: true });
fs.copyFileSync(gameFile, path.join(root, 'site', 'jogo', 'index.html'));
console.log('site/jogo/index.html atualizado');

// 2. navegador
const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const chrome = candidates.find(p => fs.existsSync(p));
if (!chrome) { console.error('Chrome/Edge não encontrado. Defina CHROME_PATH.'); process.exit(1); }

// 3. página temporária com um gancho que leva o jogo a cada tela (via #hash)
let html = fs.readFileSync(gameFile, 'utf8');
const end = html.lastIndexOf('})();');
const hook = `
(function () {
  const h = location.hash.slice(1); if (!h) return;
  const el = id => document.getElementById(id);
  const step = sec => { for (let k = 0; k < sec * 60; k++) update(1 / 60); };
  setTimeout(() => {
    if (h === 'fases') el('startBtn').click();
    if (h === 'naves') el('skinsBtn').click();
    if (h === 'controles') el('ctrlBtn').click();
    const demo = () => [{ s: 9100, w: 8, k: 40, d: Date.now() - 172800000 }, { s: 7400, w: 7, k: 34, d: Date.now() - 86400000 },
                        { s: 4800, w: 5, k: 21, d: Date.now() - 18000000 }, { s: 2400, w: 3, k: 10, d: Date.now() - 180000000 }];
    if (h === 'recordes') { scores = demo(); el('scoresBtn').click(); }
    if (h === 'gameover') {
      scores = demo(); el('startBtn').click(); el('lvlBtn1').click();
      score = 6200; wave = 7; kills = 34; P.lives = 0; P.alive = false; gameOver();
    }
    if (h === 'pausa') { el('startBtn').click(); el('lvlBtn1').click(); step(3); togglePause(); }
    if (h === 'celular' || h === 'editar') {
      el('startBtn').click(); el('lvlBtn1').click();
      P.hp = 1e6; P.maxHp = 1e6; wave = 2; startWave(); step(8); P.maxHp = 100; P.hp = 70;
      if (h === 'editar') { togglePause(); el('pauseEdit').click(); } else state = 'pause';
    }
    if (h === 'batalha' || h === 'boss' || h === 'oficina') {
      el('startBtn').click(); el('lvlBtn1').click();
      const mx = P.maxHp;
      if (h === 'oficina') { wave = 3; score = 6200; openShop(); return; }
      P.hp = 1e6; P.maxHp = 1e6;
      wave = h === 'boss' ? 14 : 3; startWave(); step(h === 'boss' ? 11 : 9);
      P.maxHp = mx; P.hp = Math.round(mx * .66);
      state = 'pause';
    }
  }, 700);
})();
`;
if (end < 0) { console.error('Não achei o fim do script do jogo.'); process.exit(1); }
html = html.slice(0, end) + hook + html.slice(end);
const tmp = path.join(os.tmpdir(), 'galaxy-divers-captura.html');
fs.writeFileSync(tmp, html);

// 4. capturas
const telas = ['menu', 'fases', 'naves', 'batalha', 'boss', 'oficina', 'recordes', 'gameover', 'pausa', 'celular', 'editar'];
const MOBILE = new Set(['celular', 'editar']);   // capturadas em tela de celular na horizontal, no modo celular
for (const t of telas) {
  const out = path.join(os.tmpdir(), `galaxy-divers-${t}.png`);
  try { fs.unlinkSync(out); } catch (e) {}
  const size = MOBILE.has(t) ? '--window-size=844,390' : '--window-size=1200,720';
  const url = pathToFileURL(tmp).href + (MOBILE.has(t) ? '?modo=celular' : '') + '#' + t;
  try {
    execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', size,
      '--virtual-time-budget=9000', `--screenshot=${out}`, url], { stdio: 'ignore', timeout: 60000 });
  } catch (e) { /* o Chrome às vezes sai com erro mesmo gerando o arquivo */ }
  if (!fs.existsSync(out)) { console.error('Falhou: ' + t); continue; }
  for (const dir of ['assets', path.join('site', 'assets')]) {
    fs.mkdirSync(path.join(root, dir), { recursive: true });
    fs.copyFileSync(out, path.join(root, dir, t + '.png'));
  }
  console.log('captura ok: ' + t);
}
