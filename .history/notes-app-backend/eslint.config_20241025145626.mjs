import globals from "globals";
import pluginJs from "@eslint/js";
import dastyle from "eslint-dicodingacademy";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
];