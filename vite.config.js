
const defineConfig = ({ command, mode, ssrBuild }) => {
  const config = {
    root: './src',
    publicDir: '../public',
    build: {
      outDir: '../dist',
      copyPublicDir: true
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
    base: '/'
  }
}

export default defineConfig
