import globals from "globals";
import pluginJs from "@eslint/js";
import dastyle from "eslint-config-dicodingacademy";


export default [
  dastyle,
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
];