# mdp-copy
[![NPM version](https://img.shields.io/npm/v/mdp-copy.svg)](http://npmjs.com/package/mdp-copy)
[![Build Status](https://github.com/extremeheat/mdp-copy/actions/workflows/ci.yml/badge.svg)](https://github.com/extremeheat/mdp-copy/actions/workflows/)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/extremeheat/mdp-copy)

CLI tool for loading and parsing LXL MDP formatted prompt files.

## Install
```
npx mdp-copy --help
```

## Usage

```html
mdp-copy - v0.1.0
Copy a templated markdown file in LXL format (MDP) to the clipboard.

Positionals:
  file  The file to copy to the clipboard

Options:

Usage:
  mdp-copy file.md
  mdp-copy file.md --VAR_NAME valueHere --ANOTHER "contents here"
```

File formatted like https://github.com/extremeheat/LXL/blob/main/docs/MarkdownProcessing.md.

### Inline file loading

#### test.md
````
Today is %%%(DAY)%%%.
The contents of hello.txt is
```
%%%({ "file": "hello.txt" })%%%
```
````

#### hello.txt
```
world
```

### Usage

```
npx mdp-copy test.md --DAY Monday
```

will copy this to clipboard:
````
Today is Monday
The contents of hello.txt is
```
world
```
````