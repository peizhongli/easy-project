import path from "path";
import { fileURLToPath } from "url";
import {
  checkExists,
  getUpperCamelCase,
  generateDir,
  makeFile,
  readFile,
} from "../utils/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const generateLessFile = (componentName) => {
  makeFile(path.join(componentName, "index.module.less"));
};

const generateReactTsFile = async (componentName, tplPath) => {
  const tplData = (await readFile(tplPath)).replace(
    /\$\{(componentName)\}/g,
    componentName
  );
  makeFile(path.join(componentName, "index.tsx"), tplData);
};

const generateReactFile = async (componentName, tplPath) => {
  const tplData = (await readFile(tplPath)).replace(
    /\$\{(componentName)\}/g,
    componentName
  );
  makeFile(path.join(componentName, "index.jsx"), tplData);
};

const generateVueFile = async (componentName, tplPath) => {
  const tplData = await readFile(tplPath);
  makeFile(path.join(componentName, "index.vue"), tplData);
};

const generateFiles = (componentName, template) => {
  const tplPath = path.join(__dirname, "../tpl", template);

  switch (template) {
    case "react-ts":
      generateLessFile(componentName);
      generateReactTsFile(componentName, tplPath);
      break;
    case "react":
      generateLessFile(componentName);
      generateReactFile(componentName, tplPath);
      break;
    case "vue-ts":
    case "vue":
      generateVueFile(componentName, tplPath);
      break;

    default:
      break;
  }
};

export default async (componentName, template) => {
  const compName = getUpperCamelCase(componentName);
  const isExists = await checkExists(compName);
  if (isExists) {
    throw new Error("The component already exists!");
  }
  try {
    await generateDir(compName);
    await generateFiles(compName, template);
  } catch (error) {
    throw error;
  }
};
