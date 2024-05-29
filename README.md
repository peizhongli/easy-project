# @ninjaya/easy-project-cli

other languages: English | [简体中文](https://github.com/peizhongli/easy-project-cli/blob/main/README_CN.md)

This tool is used to help generate directories for project initialization as well as component directories. ( react-ts | react | vue-ts | vue ) 

## Installation

```bash
$ npm install @ninjaya/easy-project-cli -g
```

## Commands

### mkproj init [directory]

generate directories

```bash
Arguments:
  # define directory names separated by "," (default: all directories)
  [directory]
```
#### Usage

```bash
# default generate all directories (assets | components | pages | hooks | service | apis | utils | router)
$ mkproj init
# generate the specified directories
$ mkproj init assets,components,pages
```



### mkproj create [options] <component>

select the template for creating the component

```bash
$ mkproj create [options] <component>
```

```bash
Arguments: 
  # define the component directory name
  <component>

Options: 
  # type: react-ts | react | vue-ts | vue (default: react-ts)
  -t, --template <type>
```

#### Usage
```bash
# default generate component directory of react-ts
$ mkproj create topBanner
# generate component directory of the specified template
$ mkproj create topBanner -t vue-ts
```

### mkproj config [options] [directory]

incremental rewrite tsconfig.json and write vite.config about "alias" and "baseUrl" (assets | components | pages | hooks | service | apis | utils | router)

```bash
$ mkproj config [options] [directory]
```

```bash
Arguments: 
  # set directory alias separated by "," (default: all directories)
  <directory>

Options: 
  # type: react-ts | react | vue-ts | vue (default: react-ts)
  -t, --template <type>
```
#### Usage
```bash
# default rewrite all alias of react-ts
$ mkproj config
# rewrite alias of the specified template
$ mkproj config -t vue-ts
# rewrite alias of the specified directory
$ mkproj config assets,pages,apis
```
