module.exports = {
    devServer: {
        port: 8080,
        proxy: {
            '^/api': {
                target: 'http://localhost:8081',
                ws: true,
                changeOrigin: true
            },
            '^/pub': {
                target: 'http://localhost:8081',
                ws: true,
                changeOrigin: true
            },
            '^/ws': {
                target: 'http://localhost:8081',
                ws: true,
                changeOrigin: true
            },
        },
        disableHostCheck: true
    }

}