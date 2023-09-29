const fs = require('fs');

const read = (s) => {
    console.log(`\t -> '${s}'.`)
    return fs.readFileSync(s)
} 
const as_css_comment = (s) => `/**${s}*/`

console.log("Combining all files:")

const IN_ABOUT          = read('./css/about.css')
const IN_LICENSE        = as_css_comment(read('./LICENSE.md'))
const IN_STYLE_SETTINGS = read('./css/style-settings.css')
const IN_THEME          = read('./css/theme.min.css')

fs.writeFileSync('./theme.css', `${IN_ABOUT}\n${IN_LICENSE}\n${IN_STYLE_SETTINGS}\n${IN_THEME}`.replace(/\uFEFF/, ""));