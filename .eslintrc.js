module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["plugin:react/recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    env: {
        browser: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        "react/react-in-jsx-scope": "off",
        "react-hooks/exhaustive-deps": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
            },
        ],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    overrides: [
        {
            files: ["*/.tsx"],
            rules: {
                "react/prop-types": "off",
            },
        },
    ],
};
