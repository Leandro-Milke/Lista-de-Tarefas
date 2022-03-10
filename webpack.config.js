const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: './public/bundle.js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
          },
          liveReload: true,
          compress: true,
          port: 8083,
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ],
    }
}