const fs = require('fs');
const { spawn } = require('child_process');

const PLAYGROUND   = "/home/dan/obsidian/playground"
const THEME        = "halcyon"
const DEST         = `${PLAYGROUND}/.obsidian/themes/${THEME}`
const PUBLISH_DEST = `${PLAYGROUND}/publish.css`

const MANIFEST_SRC = "./manifest.json"
const SASS_SRC     = "./scss/theme.scss"
const PUBLISH_SRC  = "./scss/theme-publish.scss"
const MANIFEST_DST = `${DEST}/manifest.json`

const SASS_CMD         = ["--no-source-map", "--watch", `${SASS_SRC}`, `${DEST}/theme.css`]
const SASS_CMD_PUBLISH = ["--no-source-map", "--watch", `${PUBLISH_SRC}`, `${PUBLISH_DEST}`]

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

// Run SASS twice
const sass_theme = spawn("sass", SASS_CMD);

sass_theme.stdout.setEncoding("utf-8")
sass_theme.stdout.on('data', (chunk) => {
	console.log(`[theme] ${chunk}`)
})

sass_theme.stderr.setEncoding("utf-8")
sass_theme.stderr.on("data", (chunk) => {
	console.log(`[theme] ${chunk}`)
})

sass_theme.on('close', (code) => {
	console.log(`[theme] sass process exited with code ${code}`)
})


const sass_publish = spawn("sass", SASS_CMD_PUBLISH);
sass_publish.stdout.setEncoding("utf-8")
sass_publish.stdout.on('data', (chunk) => {
	console.log(`[publish] ${chunk}`)
})

sass_publish.stderr.setEncoding("utf-8")
sass_publish.stderr.on("data", (chunk) => {
	console.log(`[publish] ${chunk}`)
})

sass_publish.on('close', (code) => {
	console.log(`[publish] sass process exited with code ${code}`)
})
