// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: {enabled: false},
    modules: ['@nuxt/ui', '@nuxtjs/i18n'],
    css: ['~/assets/css/style.css'],
    devServer: {
        port: 3001,
    },
    routeRules: {
        '/': {
            prerender: true,
        }
    },
    app: {
        head: {
            title: '中科赋能',
            meta: [
                {
                    name: 'keywords',
                    content: 'MyGPT, AI, Woka, WokaGPT, Generative AI'
                },
                {
                    name: 'description',
                    content: 'Integrated web platform supporting gemma/llama3/deepseek by Woka'
                }
            ],
            link: [
                {
                    rel: 'manifest',
                    href: '/manifest.json'
                }
            ]
        }
    },
    vite: {
        build: {
            rollupOptions: {
                output: {
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            return 'vendor'
                        }
                    }
                }
            }
        }
    },
    i18n: {
        vueI18n: './i18n.config.ts',
        strategy: 'no_prefix',
        defaultLocale: 'zh',
    }
    // nitro: {
    //     vercel: {
    //         regions: ["sin1", "syd1", "sfo1", "iad1", "pdx1", "cle1"]
    //     }
    // }
})
