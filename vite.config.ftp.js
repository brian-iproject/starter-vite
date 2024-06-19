import vitePlugins from "./vite/vite.plugins.js";
import vitePluginFtp from 'vite-plugin-ftp';
import authFTP from "./authFTP.js";

export default {
    plugins: [
        vitePlugins(),
        {
            ...vitePluginFtp({
                user: "***",
                password: "***",
                host: "***",
                port: 21,
                localRoot: "dist",
                remoteDir: "***",
                ...authFTP
            }),
            enforce: 'post'
        }

    ],
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name].js',
                assetFileNames: 'css/[name][extname]'
            }
        }
    }
}