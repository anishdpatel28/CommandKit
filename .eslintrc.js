module.exports = {
  extends: ["@react-native/eslint-config"],
  rules: {
    "prettier/prettier": "error",
    quotes: "off",
    "comma-dangle": "off",
    "no-trailing-spaces": "off",
    curly: "warn",
    "no-shadow": "warn",
    radix: "warn",
  },
  plugins: ["prettier"],
};
