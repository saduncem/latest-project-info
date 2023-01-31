import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import injectLastestProjectInfoForVitePlugin from 'latest-project-info/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), injectLastestProjectInfoForVitePlugin(
    {
      extraInfo: [
        {
          name: 'Version',
          value: require('./package.json').version,
        }
      ]
    }
  )],
});
