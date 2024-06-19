import { resolve } from 'path';
import vitePlugins from './vite/vite.plugins.js';

export default {
  plugins: [
    vitePlugins(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/'),
    },
  },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        chunkFileNames: 'js/main.js',
        entryFileNames: 'js/[name].js',
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return extType === 'css' ? 'css/[name][extname]' : `assets/${extType}/[name][extname]`;
        },
      },
    },
  },
};
