
const defineConfig = ({ command, mode, ssrBuild }) => {
  const config = {
    root: './src',
    publicDir: '../public',
    build: {
      outDir: '../dist',
      copyPublicDir: true,
      emptyOutDir: true
    },
    server: {
      port: 5000
    }
  }

  if (mode === 'development') {
    return {
      ...config,
      base: '/'
    }
  }

  return {
    ...config,
    base: 'https://afbayonac.github.io/priority-treemap/'
  }
}

export default defineConfig
