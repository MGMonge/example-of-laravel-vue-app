const mix = require('laravel-mix');
const fs = require('fs');
const Mustache = require('mustache')
const webpackConfig = require('./webpack.config.js')

mix
    .setPublicPath('dist')
    .webpackConfig(webpackConfig)
    .js('src/js/app.js', 'dist')
    .sass('src/sass/app.scss', 'dist', { implementation: require('node-sass') })
    .options({
        extractVueStyles: true,
        globalVueStyles: 'src/sass/base.scss',
    })
    .copy('src/images', 'dist/images', true)


if (mix.inProduction()) {
    mix.version()
}

mix.then(() => {
    // Prepare index.html file
    const template = fs.readFileSync('./src/html/index.html','utf8')
    const manifiest = JSON.parse(fs.readFileSync('./dist/mix-manifest.json'))
    const output = Mustache.render(template, {
        styles: manifiest['/app.css'],
        scripts: manifiest['/app.js'],
        icons: fs.readFileSync('./dist/icons.html','utf8')
    });

    fs.writeFile('./dist/index.html', output, (error) => {
        if (error) return console.log(error)
    })
})