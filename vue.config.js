const path = require('path')

module.exports = {
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
    },

    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 48
                    })
                ]
            }
        }
    }
}

function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/stylus/variables.styl'),
            ],
        })
}
