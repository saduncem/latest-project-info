import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import injectLastestProjectInfoForVitePlugin from 'lastest-project-info/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), injectLastestProjectInfoForVitePlugin()],
});
