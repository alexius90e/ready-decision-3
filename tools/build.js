const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const archiver = require('archiver');

// имя файла берём из аргумента
const fileName = process.argv[2];
if (!fileName) {
  console.error('Укажите имя html файла: node tools/build.js index.html');
  process.exit(1);
}

// корень проекта = на уровень выше папки tools
const rootDir = path.join(__dirname, '..');

// пути
const htmlPath = path.join(rootDir, fileName);
const buildDir = path.join(rootDir, 'build');
const archivesDir = path.join(rootDir, 'archives');

// проверка файла
if (!fs.existsSync(htmlPath)) {
  console.error(`Файл ${fileName} не найден в корне`);
  process.exit(1);
}

// очистка build
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir, { recursive: true });

// создаём папку для текущей сборки
const outDir = path.join(buildDir, path.basename(fileName, '.html'));
fs.mkdirSync(outDir, { recursive: true });

// читаем HTML
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

// копируем сам HTML
fs.writeFileSync(path.join(outDir, fileName), htmlContent);

// собираем CSS и JS
const assetsToCopy = [];

document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
  const href = link.getAttribute('href');
  if (href) assetsToCopy.push(href);
});

document.querySelectorAll('script[src]').forEach(script => {
  const src = script.getAttribute('src');
  if (src) assetsToCopy.push(src);
});

// копируем CSS/JS
assetsToCopy.forEach(relPath => {
  const srcPath = path.join(rootDir, relPath);
  if (fs.existsSync(srcPath)) {
    const destPath = path.join(outDir, relPath);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
  }
});

// копируем assets/<имя_файла>
const assetFolder = path.join(rootDir, 'assets', path.basename(fileName, '.html'));
if (fs.existsSync(assetFolder)) {
  const destAssetFolder = path.join(outDir, 'assets', path.basename(fileName, '.html'));
  fs.mkdirSync(destAssetFolder, { recursive: true });

  function copyDir(src, dest) {
    fs.readdirSync(src).forEach(item => {
      const srcItem = path.join(src, item);
      const destItem = path.join(dest, item);
      if (fs.lstatSync(srcItem).isDirectory()) {
        fs.mkdirSync(destItem, { recursive: true });
        copyDir(srcItem, destItem);
      } else {
        fs.copyFileSync(srcItem, destItem);
      }
    });
  }
  copyDir(assetFolder, destAssetFolder);
}

// создаём папку archives
fs.mkdirSync(archivesDir, { recursive: true });

// архивируем
const zipPath = path.join(archivesDir, `${path.basename(fileName, '.html')}.zip`);
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Архив создан: ${zipPath} (${archive.pointer()} байт)`);
});

archive.pipe(output);
archive.directory(outDir, false);
archive.finalize();