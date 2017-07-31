const { AotPlugin } = require('@ngtools/webpack');

const { root } = require('./helpers');
const clientBundleOutputDir = root('./wwwroot/dist');
var CopyWebpackPlugin = require('copy-webpack-plugin');
/**
 * This is a client config which should be merged on top of common config
 */
module.exports = {
    entry: {
        'main-browser': root('./Client/main.browser.ts')
    },
    output: {
        path: root('./wwwroot/dist')
    },
    target: 'web',
    plugins: [
        new CopyWebpackPlugin([
            { from: 'Client/assets', to: 'assets' }
        ])
    ]
};
