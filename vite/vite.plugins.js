import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import favicon from '@axelrindle/vite-plugin-favicon';
import { readFile } from 'fs/promises';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';

export default function vitePlugins() {
  return [
    vituum(),
    pug({
      root: './src',
      options: {
        pretty: true,
      },
    }),
    sassGlobImports(),
    favicon({
      source: './public/favicon.svg',
      output: './public/favicons/',
      generatorOptions: {
        path: '/favicons',
      },
    }),
    {
      async transformIndexHtml(html) {
        return html.replace('</head>', `${await readFile('./public/favicons/favicons.html')}</head>`);
      },
    },
    VitePluginSvgSpritemap('./src/icons/*.svg', {
      output: {
        filename: 'images/[name][extname]',
        name: 'spritemap.svg',
        view: false,
        use: false,
      },
      styles: './src/layout/styles/mixins/spritemap.scss',
    }),

  ];
}
