const { defineConfig } = require('@vue/cli-service')
	module.exports = defineConfig({
		transpileDependencies: true,
		devServer: {
			port: 8080,
			proxy: {
				'/api': {
					target: 'http://localhost:3000',
					changeOrigin: true,
					secure: false
				},
				'/images': {
					target: 'http://localhost:3000',
					changeOrigin: true,
					secure: false
				}
			},
			client: {
				webSocketURL: 'auto://0.0.0.0:0/ws'
			}
		}
	})