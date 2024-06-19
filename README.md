# Стартовый проект


## Содержание

* [Работа с GIT](#работа-с-git)
* [Стек](#стек)
* [Модули и плагины сборки](#модули-и-плагины-сборки)
* [Конфигурации](#конфигурации)
  * [Vite](#vite)
  * [vite-plugin-ftp](#vite-plugin-ftp)
  * [vite-plugin-favicon](#vite-plugin-favicon)
* [Библиотеки](#библиотеки)
* [Установка](#установка)
* [Использование](#использование)
* [Комментарии](#комментарии)
  * [Структура](#структура)
  * [Прочее](#прочее)
* [TODO](#todo)

## Работа с GIT

* Как называть коммиты - `Название или описание задачи | [ref: ID задачи]`, например `Исправить баги | [ref: 123]`. 
При отсутствии ID задачи пищет `no-ref`
* Как называть ветки - `task_{ID задачи}`, например `task_123`

## Стек

* [Pug](https://pugjs.org/api/getting-started.html)
* [SCSS](https://sass-scss.ru/)
* [PostCSS](https://postcss.org/). Для использования PostCSS плагинов
* Сборка на [Vite](https://vitejs.dev/) + [Vituum](https://vituum.dev/plugins/pug)

## Модули и плагины сборки

* [vite-plugin-favicon](https://www.npmjs.com/package/@axelrindle/vite-plugin-favicon)  
Генерация favicon. html вставки favicon генерируется в отдельном файле.
В страницы код вставляется через хук vite `transformIndexHtml` 
* [vite-plugin-svg-spritemap](https://github.com/SpiriitLabs/vite-plugin-svg-spritemap)  
Генерация svg-спрайта.
* [vite-plugin-sass-glob-import](https://github.com/cmalven/vite-plugin-sass-glob-import)  
Позволяет использовать синтаксис glob в scss
* [vite-plugin-zip-pack](https://github.com/7th-Cyborg/vite-plugin-zip-pack)  
Создание zip-архива
* [vite-plugin-ftp](https://github.com/JianGuoPaPa/vite-plugin-ftp)  
Загрузка проекта на FTP
* [autoprefixer](https://github.com/postcss/autoprefixer)  
Автоматическое добавление CSS-правил с вендорными префиксами в соответствии с настройками [Browserslist](https://github.com/browserslist/browserslist)
* [postcss-combine-media-query](https://github.com/SassNinja/postcss-combine-media-query)  
Автоматически объединяет одинаковые блоки media query в один


## Конфигурации

### Vite

`vite.config.js` - основной файл конфигурации, он используется при запуске стандартных команд vite  
`vite.config.zip.js` - конфигурация для команды архивации  
`vite.config.ftp.js` - конфигурация для команды загрузки по ftp

Все общие плагины вынесены в отдельный файл `vite/vite.plugins.js`, который подключается во всех конфигурациях

### vite-plugin-ftp

Базовый конфиг:
```
{
  user: "***",
  password: "***",
  host: "***",
  port: 21,
  localRoot: "dist",
  remoteDir: "***",
  ...authFTP
}
```
В объекте находятся все обязательные параметры. В целях безопасности, вместо некоторых значений стоят звёздочки.
При это объект расширяется импортируемым из файла `/authFTP.js` объектом. Файл `/authFTP.js` исключается в `.gitignore`.
Пример файла:
```
export default {
  user: "test",
  password: "test",
  host: "0.0.0.0",
  port: 21,
  localRoot: "dist",
  remoteDir: "/var/www",
}
```

### vite-plugin-favicon

Сгенерированный html, плагин вставляет в новый отдельный файл. Для вставки в код страниц,
используется хук `transformIndexHtml`:
```
{
  async transformIndexHtml(html) {
    return html.replace('</head>', `${await readFile('./public/favicons/favicons.html')}</head>`);
  }
}
```


## Библиотеки

* [normalize.css](https://necolas.github.io/normalize.css/)  
сброс стилей

## Установка

Установить Node JS версии 18 и больше, затем выполнить команду:

```bash
npm install
```

## Использование

Режим разработки:

```bash
npm run dev
```

Собрать проект:

```bash
npm run build
```

Проверить финальную версию:

```bash
npm run preview
```

Создать zip-архив собранного проекта:

```bash
npm run zip
```

Загрузить на FTP:

```bash
npm run ftp
```

## Комментарии

### Структура

* `/public` - директория со статикой, просто копируется без обработки
* `/src/components` - директория с самостоятельными компонентами, которые встречаются на нескольких страницах
* `/src/pages` - директория со страницами
* `/src/layout` - директория с глобальными файлами
* `/src/data` - директория с данными
* `/src/icons` - директория с иконками для сборки в спрайт

### Прочее

* В проекте используются линтеры. Включи `editorconfig`, `stylelint`, `eslint` в своём IDE
* Разделитель для БЭМ-элементов - `__`, для БЭМ-модификаторов - `--`
* В CSS используется подход MobileFirst
* Глобальные переменные на JS лучше помещать сюда `window.pixelplus`


## TODO

* Выносить media query в отдельные файлы, вариант плагина: [css-media-splitter](https://www.npmjs.com/package/css-media-splitter)
* Поискать альтернативу для [viteJoinMediaQueries](https://github.com/oleksandr-dukhovnyy/vite-join-media-queries)
* Генерация шрифтов 
