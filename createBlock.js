// Генератор файлов блока
// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]

import fs from 'fs'
import { mkdirp } from 'mkdirp'
const filesName = {
    scss: 'style',
    js: 'script',
    md: 'readme',
    pug: 'index'

}

const blockName = process.argv[2];
const defaultExtensions = ['scss', 'pug']; // расширения по умолчанию
const extensions = process.argv[3] ? process.argv.slice(3) : defaultExtensions;

// Если есть имя блока
if (blockName) {
    const dirPath = `./src/components/${blockName}/`; // полный путь к создаваемой папке блока

    const made = mkdirp.sync(dirPath);
    console.log(`[NTH] Создание папки: ${made}`);

    // Обходим массив расширений и создаем файлы, если они еще не созданы
    extensions.forEach((extension) => {
        const filePath = `${dirPath}${filesName[extension]}.${extension}`;  // полный путь к создаваемому файлу
        let fileContent = '';                                               // будущий контент файла
        let fileCreateMsg = '';                                             // будущее сообщение в консоли при создании файла

        if (extension === 'scss') {
            //fileContent = `// В этом файле должны быть стили для БЭМ-блока ${blockName}, его элементов,\n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n// Очередность: http://nicothin.github.io/idiomatic-pre-CSS/#priority\n\n.${blockName} {\n\n  $block-name:                &; // #{$block-name}__element\n}\n`;
            fileContent = `.${blockName} {\n\n  $block-name: &; // #{$block-name}__element\n}\n`;
            // fileCreateMsg = '';
        }

        else if (extension === 'js') {
            //fileContent = `/* global document */\n\n// import ready from 'Utils/documentReady.js';\n\n// ready(function() {\n//   \n// });\n`;
            fileContent = '';
        }

        else if (extension === 'md') {
            fileContent = '';
        }

        else if (extension === 'pug') {
            fileContent = `mixin ${blockName}(data, props)\n\n  //- Принимает:\n  //-   props {\n  //-     mods: ''          {array}  - модификаторы блока\n\n  if typeof (props) === 'undefined'\n    - props = {};\n\n  - let allMods = '';\n  if typeof (props.mods) !== 'undefined' && props.mods\n    each mods, index in props.mods\n      - allMods += index ? ' ': '';\n      - allMods += '${blockName}--' + mods;\n\n  .${blockName}(class = allMods)&attributes(attributes)\n    .${blockName}__inner\n`;
        }

        else if (extension === 'images') {
            const imgFolder = `${dirPath}images/`;
            if (fileExist(imgFolder) === false) {
                const made = mkdirp.sync(imgFolder);
                console.log(`[NTH] Создание папки: ${made}`);
            } else {
                console.log(`[NTH] Папка ${imgFolder} НЕ создана (уже существует) `);
            }
        }

        if (fileExist(filePath) === false && extension !== 'images' && extension !== 'md') {
            fs.writeFile(filePath, fileContent, (err) => {
                if (err) {
                    return console.log(`[NTH] Файл НЕ создан: ${err}`);
                }
                console.log(`[NTH] Файл создан: ${filePath}`);
                if (fileCreateMsg) {
                    console.warn(fileCreateMsg);
                }
            });
        }
        else if (extension !== 'images' && extension !== 'md') {
            console.log(`[NTH] Файл НЕ создан: ${filePath} (уже существует)`);
        }
        else if (extension === 'md') {
            fs.writeFile(`${dirPath}readme.md`, fileContent, (err) => {
                if (err) {
                    return console.log(`[NTH] Файл НЕ создан: ${err}`);
                }
                console.log(`[NTH] Файл создан: ${dirPath}readme.md`);
                if (fileCreateMsg) {
                    console.warn(fileCreateMsg);
                }
            });
        }
    });
} else {
    console.log('[NTH] Отмена операции: не указан блок');
}




function uniqueArray(arr) {
    const objectTemp = {};
    for (let i = 0; i < arr.length; i++) {
        const str = arr[i];
        objectTemp[str] = true;
    }
    return Object.keys(objectTemp);
}

function fileExist(path) {
    //const fs = require('fs');
    try {
        fs.statSync(path);
    } catch (err) {
        return !(err && err.code === 'ENOENT');
    }
}