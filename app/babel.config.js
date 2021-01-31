module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      ["module-resolver", {
        "alias": {
          "components": "./components",
          "api": "./api",
          "utils": "./utils",
          "navigation": "./navigation",
          "constants": "./constants",
          "screens": "./screens",
          "images": "./assets/images",
          "assets": "./assets",
          "layouts": "./layouts",
          "types": "./types",
          "functions": "./functions",
        }
      }]
    ]
  };
};
