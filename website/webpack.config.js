const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

module.exports = {
    plugins: [
        new SVGSpritemapPlugin('src/icons/**/*.svg', {
            output: {
                filename: 'icons.html',
                chunk: {
                    keep: true
                }
            },
            sprite: {
                prefix: 'icon--'
            }
        })
    ]
}