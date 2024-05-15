#!/usr/bin/env node
import { Command } from "commander";
import generateComp from "../lib/generate-comp.js";
import generateConfig from "../lib/generate-config.js";
import generateDir from "../lib/generate-dir.js";
import { splitStr } from "../utils/index.js";

const program = new Command();

program
  .version("0.0.1", "-v, --version")
  .usage(
    "\n  init [directory] \n  create [options] <component> \n  config [options] [directory]"
  );

program
  .command("init")
  .argument(
    "[directory]",
    `define directory names separated by "," (default: all directories)`,
    "assets,components,pages,hooks,service,apis,utils"
  )
  .description(
    "generate directories (assets | components | pages | hooks | service | apis | utils)"
  )
  .action(async (directories) => {
    try {
      generateDir(splitStr(directories));
    } catch (error) {
      program.error(error);
    }
  });

program
  .command("create")
  .argument("<component>", "define the component directory name")
  .option(
    "-t, --template <type>",
    "react-ts* | react | vue-ts | vue",
    "react-ts"
  )
  .description(
    "-t, --template, select the template for creating the component (react-ts* | react | vue-ts | vue)"
  )
  .action(async (component, { template }) => {
    try {
      await generateComp(component, template);
    } catch (error) {
      program.error(error);
    }
  });

program
  .command("config")
  .argument(
    "[directory]",
    `set directory alias separated by "," (default: all directories)`,
    "assets,components,pages,hooks,service,apis,utils"
  )
  .option(
    "-t, --template <type>",
    "react-ts* | react | vue-ts | vue",
    "react-ts"
  )
  .description(
    `-t, --template, incremental rewrite tsconfig.json and write vite.config about "alias" and "baseUrl (react-ts* | react | vue-ts | vue)`
  )
  .action(async (directories, { template }) => {
    try {
      await generateConfig(splitStr(directories), template);
    } catch (error) {
      program.error(error);
    }
  });

program.parse();
