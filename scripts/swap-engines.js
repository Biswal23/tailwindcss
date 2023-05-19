let fs = require('fs')
let path = require('path')
let fg = require('fast-glob')

// Find out what the current engine is that we are using:
let files = fg.sync(['./{src,stubs,oxide,types}/**/*.{stable,oxide}.*', './*.{stable,oxide}.*'], {
  cwd: path.resolve(__dirname, '..'),
  ignore: ['node_modules/**/*', '.git/**/*', '.github/**/*', './lib/**/*'],
})

let otherEngine = files[0].includes('.stable') ? 'stable' : 'oxide'
let currentEngine = otherEngine === 'oxide' ? 'stable' : 'oxide'

console.log(`Current engine: \`${currentEngine}\`, swapping to \`${otherEngine}\``)

// Swap the engines
for (let file of files) {
  let currentEngineFile = file.replace(`.${otherEngine}`, `.${currentEngine}`)
  let otherEngineFile = file

  let bare = file.replace(`.${otherEngine}`, '')

  fs.renameSync(bare, currentEngineFile)
  fs.renameSync(otherEngineFile, bare)
}

console.log(
  'Engines have been swapped. Make sure to run `npm install` to update your dependencies.'
)
