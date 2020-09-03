module.exports = {
    // baseUrl: './',
    // productionSourceMap: false,
    configureWebpack: (config) => {
        // 增加 iview-loader
        config.module.rules[0].use.push({
            loader: 'iview-loader',
            options: {
                prefix: false
            }
        })
        // 在命令行使用 vue inspect > o.js 可以检查修改后的webpack配置文件
    },
    productionSourceMap: false,
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
        },
        port: 8081
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/'
        : '/my/'
}
