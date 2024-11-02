import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist'
  },
  server: {
    open: true
  },
  // assetsInclude: ['public/docs/**'],
  // plugins: [{
  //   name: 'generate-docs',
  //   buildStart: async () => {
  //       await generateDocs();
  //   }
  // }]
}) 