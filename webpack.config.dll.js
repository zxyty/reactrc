
const webpack    = require('webpack')
const path       = require('path')

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'react-loadable'],
    },
    mode  : 'production',
    output: {
        path     : path.resolve(__dirname, 'dll'),
        filename : '[name].dll.[hash:5].js',
        library  : '[name]_library'
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.DllPlugin({
            name    : '[name]_library',
            path    : path.resolve(__dirname, 'dll', 'manifest.json'),
            context : __dirname
        })
    ]
};