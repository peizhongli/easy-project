import path from "path";
import { fileURLToPath } from "url";
import jsoncParser from "jsonc-parser";
import { makeFile, readFile, checkExists } from "../utils/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TS_CONFIG_PATH = "tsconfig.json";

const generateTsConfig = async (directories) => {
  const isExists = await checkExists(TS_CONFIG_PATH);
  // 如果配置文件已存在就直接读取，否则使用模板中的
  const configFilePath = isExists
    ? TS_CONFIG_PATH
    : path.join(__dirname, "../tpl", "ts-config");
  // 读取配置
  const current = jsoncParser.parse((await readFile(configFilePath)) || "{}");
  const compilerOptions = current.compilerOptions || {};
  const baseUrl = compilerOptions.baseUrl || "./";
  const paths = compilerOptions.paths || {};
  // 配置baseUrl及别名
  current.compilerOptions = {
    ...compilerOptions,
    baseUrl,
    paths: {
      "@src/*": ["src/*"],
      ...paths,
      ...directories.reduce(
        (r, dir) => ({
          ...r,
          [`@${dir}/*`]: [`${["src", dir].join("/")}/*`],
        }),
        {}
      ),
    },
  };
  await makeFile(TS_CONFIG_PATH, JSON.stringify(current, null, "\t"));
};

const generateAliasStr = (directories) =>
  JSON.stringify(
    directories.reduce(
      (r, dir) => ({
        ...r,
        [`@${dir}`]: `/src/${dir}`,
      }),
      { "@src": "/src" }
    ),
    null,
    "\t".repeat(3)
  ).replace("}", "\t\t\}");

const generateReactViteConfig = async (directories, type) => {
  const config = await readFile(
    path.join(__dirname, "../tpl", "react-vite-config")
  );
  await makeFile(
    `vite.config.${type}`,
    config.replace(/\$\{(alias)\}/, generateAliasStr(directories))
  );
};

const generateVueViteConfig = async (directories, type) => {
  const config = await readFile(
    path.join(__dirname, "../tpl", "vue-vite-config")
  );
  await makeFile(
    `vite.config.${type}`,
    config.replace(/\$\{(alias)\}/, generateAliasStr(directories))
  );
};

export default async (directories, template) => {
  switch (template) {
    case "react-ts":
      generateTsConfig(directories);
      generateReactViteConfig(directories, "ts");
      break;

    case "react":
      generateReactViteConfig(directories, "js");
      break;

    case "vue-ts":
      generateTsConfig(directories);
      generateVueViteConfig(directories, "ts");
      break;

    case "vue":
      generateVueViteConfig(directories, "js");
      break;

    default:
      break;
  }
};
