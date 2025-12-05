const fs = require('fs');
const path = require('path');

// аргументы из консоли (список блоков)
const [, , ...blockNames] = process.argv;

if (blockNames.length === 0) {
  console.error('Использование: node tools/createBlock.js block1 block2 ...');
  process.exit(1);
}

const rootDir = path.join(__dirname, '..');
const scssDir = path.join(rootDir, 'scss');
const assetsDir = path.join(rootDir, 'assets');

// создаём папки scss и assets, если их нет
if (!fs.existsSync(scssDir)) {
  fs.mkdirSync(scssDir, { recursive: true });
}
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// функция для создания блока
function createBlock(blockName) {
  const htmlPath = path.join(rootDir, `${blockName}.html`);
  const scssPath = path.join(scssDir, `${blockName}.scss`);
  const assetFolder = path.join(assetsDir, blockName);

  // создаём html
  if (!fs.existsSync(htmlPath)) {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${blockName}</title>
  <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
  <link rel="stylesheet" href="./css/base.css" />
  <link rel="stylesheet" href="./css/${blockName}.css">
</head>
<body>
  <section class="${blockName}">
    <div class="container">
      <h2 class="${blockName}__title">${blockName} title</h2>
      <p class="${blockName}__description">${blockName} description</p>
    </div>
  </section>
</body>
</html>`;
    fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
    console.log(`Создан файл: ${htmlPath}`);
  } else {
    console.log(`Файл ${htmlPath} уже существует`);
  }

  // создаём scss
  if (!fs.existsSync(scssPath)) {
    const scssContent = `@import './variables';
@import './mixins';

.${blockName} {
  &__title {
  }

  &__description {
  }
}`;
    fs.writeFileSync(scssPath, scssContent, 'utf-8');
    console.log(`Создан файл: ${scssPath}`);
  } else {
    console.log(`Файл ${scssPath} уже существует`);
  }

  // создаём папку assets
  if (!fs.existsSync(assetFolder)) {
    fs.mkdirSync(assetFolder, { recursive: true });
    console.log(`Создана папка: ${assetFolder}`);
  } else {
    console.log(`Папка ${assetFolder} уже существует`);
  }
}

// обработка всех блоков
blockNames.forEach(createBlock);
