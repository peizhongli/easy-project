import path from "path";
import { generateDir } from "../utils/index.js";

const generateSub = async (names) => {
  names.forEach((name) => {
    const [_, pathname] = name.split("\\");
    switch (pathname) {
      case "assets":
        generateDir(["styles", "images"].map((sub) => path.join(name, sub)));
        break;

      default:
        break;
    }
  });
};

export default async (names) => {
  try {
    const nameList = names.map((i) => path.join("src", i));
    await generateDir(nameList);
    await generateSub(nameList);
  } catch (error) {
    console.log("error :>> ", error);
  }
};
