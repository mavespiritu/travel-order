import { defineConfig } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  css: {
    postcss,
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, 'src/components/'),
      },
      {
        find: "@library",
        replacement: path.resolve(__dirname, 'src/library/'),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, 'src/hooks/'),
      },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, 'src/constants/'),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, 'src/utils/'),
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: false,
    }
  }
})
