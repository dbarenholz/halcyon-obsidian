const fs = require('fs');

const read           = (s) => { return fs.readFileSync(s) }
const as_css_comment = (s) => `/*${s}*/`

console.log("Combining all files for theme...")

const IN_ABOUT          = read('./css/about.css')
const IN_LICENSE        = as_css_comment(read('./LICENSE.md'))
const IN_THEME          = read('./css/theme.min.css')
const IN_STYLE_SETTINGS = as_css_comment(
	" @settings\n\n" + read('./style-settings.yml')
)

fs.writeFileSync('./theme.css', `${IN_ABOUT}\n${IN_LICENSE}\n${IN_STYLE_SETTINGS}\n${IN_THEME}`.replace(/\uFEFF/, ""));

console.log("Combining all files for publish...")
const IN_PUBLISH = read('./css/publish.css')
fs.writeFileSync('./publish.css', `${IN_ABOUT}\n${IN_LICENSE}\n${IN_PUBLISH}`.replace(/\uFEFF/, ""));
