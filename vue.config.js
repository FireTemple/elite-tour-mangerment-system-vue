module.exports = {
    // baseUrl: './',
    // productionSourceMap: false,
    devServer: {
        proxy: {
            '/test': {
                target: 'http://localhost:8081',
                pathReWrite:{
                    '^/test': ''
                },
                changeOrigin: true,
                secure:false
            },
            '/api': {
                target: 'http://localhost:8081',
                pathReWrite:{
                    '^/api': ''
                },
                changeOrigin: true,
                secure:false
            },
        }
    }
}
