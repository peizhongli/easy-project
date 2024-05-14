import fs from "fs/promises";

// 生成目录
export const generateDir = async (dir) => {
  const pList = [];
  if (Array.isArray(dir)) {
    pList.push(...dir.map((name) => makeDir(name)));
  } else if (typeof dir === "string") {
    pList.push(makeDir(dir));
  } else {
    throw new TypeError("dir must be a string or an array of strings");
  }
  return await Promise.all(pList);
};

// 检测文件或目录是否存在
export const checkExists = async (filepath) => {
  try {
    await fs.access(filepath);
    return true;
  } catch (error) {
    return false;
  }
};

// 读取文件
export const readFile = (filepath) => fs.readFile(filepath, "utf8");

// 生成目录
export const makeDir = (filepath) => fs.mkdir(filepath, { recursive: true });

// 生成文件
export const makeFile = (filepath, data = "") => fs.writeFile(filepath, data);

// LowerCamelCase
export const getLowerCamelCase = (str) =>
  str.charAt(0).toLowerCase() + str.slice(1);

// UpperCamelCase
export const getUpperCamelCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

// HyphenCase
export const getHyphenCase = (str) =>
  getLowerCamelCase(str).replace(
    /[A-Z]/g,
    (match) => "-" + match.toLowerCase()
  );

// 用","分割字符串
export const splitStr = (str, separator = ",") =>
  str.replace(/\s/g, "").split(separator);
