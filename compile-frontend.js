const fse = require('fs-extra')
const path = require('path')
const { promisify } = require('util')
const ejsRenderFile = promisify(require('ejs').renderFile)
const globP = promisify(require('glob'))
// const config = require('../site.config')

const srcPath = './src'
const distPath = './static'

// clear destination folder
fse.emptyDirSync(distPath)

// copy assets folder
fse.copy(`./dev/library`, `${distPath}/library`)

// read page templates
globP('**/*.ejs', { cwd: `dev/App/Templates` })
  .then((files) => {
    files.forEach((file) => {
      const fileData = path.parse(file)
      const destPath = path.join(distPath, fileData.dir)

      // create destination directory
      fse.mkdirs(destPath)
        .then(() => {
          // render page
          return ejsRenderFile(`./dev/App/Templates/${file}`, Object.assign({}, {compile: true}))
        })
        .then((pageContents) => {
          // render layout with page contents
          return ejsRenderFile(`./dev/App/MasterPages/master.ejs`, Object.assign({}, { content: pageContents }))
        })
        .then((layoutContent) => {
          // save the html file
          fse.writeFile(`${destPath}/${fileData.name}.html`, layoutContent)
        })
        .catch((err) => { console.error(err) })
    })
  })
  .catch((err) => { console.error(err) })