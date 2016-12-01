module.exports = {
    devtool: 'source-map',
    entry: __dirname + '/app/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.min.js'
    },
    devServer: {
        contentBase: './public',
        color: true,
        inline: true,
        historyApiFallback: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel']
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.scss/,
                loaders: ["style", "css?modules", "sass"]
            }
        ]
    },
    resolve: {
        root: __dirname
    }
};