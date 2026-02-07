import tailwind from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/scripts'
  ],
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [
      tailwind()
    ],
  },
  typescript: {
    typeCheck: true,
  },
  ui: {
		theme: {
			colors: [
				'primary',
				'secondary',
				'success',
				'info',
				'warning',
				'error',
				'neutral',
			],
		},
	},
  content: {
    renderer: {
      anchorLinks: {
        h1: false,
        h2:  false,
        h3:  false,
        h4:  false,
        h5:  false,
        h6:  false,
      }
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

})