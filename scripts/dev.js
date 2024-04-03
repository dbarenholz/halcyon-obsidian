const fs = require('fs');
const { spawn } = require('child_process');

const THEME_VAULT  = "./theme-dev-vault"
// TODO: It would be cleaner to get the theme name from the manifest.
const DEST         = `${THEME_VAULT}/.obsidian/themes/halcyon`
const MANIFEST_SRC = "./manifest.json"
const SASS_SRC     = "./scss/theme.scss"
const MANIFEST_DST = `${DEST}/manifest.json`

const SASS_CMD = ["--no-source-map", "--watch", `${SASS_SRC}`, `${DEST}/theme.css`]

// Make theme directory
try {
	if (!fs.existsSync(DEST)) {
		console.log(`${DEST} does not exist, creating...`)
		fs.mkdirSync(DEST);
	}
} catch (err) {
    console.error(`ERR: ${err}`);
}

// Copy manifest
try {
	fs.copyFileSync(MANIFEST_SRC, MANIFEST_DST)
	console.log(`OK: ${MANIFEST_SRC} -> ${MANIFEST_DST}`)
} catch (err) {
	console.error(err)
}

// Run SASS
const sass = spawn("sass", SASS_CMD);

sass.stdout.setEncoding("utf-8")
sass.stdout.on('data', (chunk) => console.log(chunk))

sass.stderr.setEncoding("utf-8")
sass.stderr.on("data", (chunk) => console.error(chunk))

sass.on('close', (code) => console.log(`sass process exited with code ${code}`))

