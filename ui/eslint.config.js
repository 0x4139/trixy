import globals from "globals";
import eslintPluginSvelte from 'eslint-plugin-svelte';
import pluginJs from "@eslint/js";


export default [
    {languageOptions: {globals: globals.browser}},
    ...eslintPluginSvelte.configs['flat/recommended'],
    pluginJs.configs.recommended,
];
