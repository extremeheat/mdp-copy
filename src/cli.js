#!/usr/bin/env node
const fs = require('fs')
const { copy } = require('copy-paste')
const args = require('basic-args')({
  name: 'mdp-copy',
  version: require('../package.json').version,
  description: 'Copy a templated markdown file in LXL format (MDP) to the clipboard.',
  positionals: [
    { name: 'file', type: String, description: 'The file to copy to the clipboard' }
  ],
  examples: [
    'mdp-copy file.md',
    'mdp-copy file.md --VAR_NAME valueHere --ANOTHER "contents here"'
  ]
})
const { tools } = require('langxlang')

// console.log('Args', process.cwd(), args)

const mdp = fs.readFileSync(args.file, 'utf8')
const loaded = tools.loadPrompt(mdp, {
  ...args._,
  SOME_VARIABLE: 'This is a variable that will be replaced.'
})

function raise (msg) {
  console.error(msg)
  process.exit(1)
}

function readFile (file) {
  if (file.includes('..')) return raise('For security reasons, cannot read files outside of the current directory.')
  if (!fs.existsSync(file)) return raise(`File '${file}' loaded in prompt does not exist in the current directory '${process.cwd()}'.`)
  if (!fs.statSync(file).isFile()) return raise(`File '${file}' loaded in prompt is not a file.`)
  return fs.readFileSync(file, 'utf8')
}

function tryCopy (str) {
  copy(str, (err) => {
    if (err) {
      console.error('Error copying to clipboard:', err)
    } else {
      console.log('Copied to clipboard.')
    }
  })
}

if (typeof loaded === 'string') {
  tryCopy(loaded)
} else {
  const str = Object.entries(loaded).map(([key, value]) => {
    if (value.file) {
      return readFile(value.file)
    } else if (value.imageURL) {
      throw new Error('Image URLs are not supported yet.')
    } else if (value.text) {
      return value.text
    }
    return ''
  }).join('')
  tryCopy(str)
}

console.log('✅ Done')
