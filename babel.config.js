module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            api: "./api",
            utils: "./utils",
            src: "./src",
            lib: "./lib",
            navigation: "./navigation",
            hooks: "./hooks",
            components: "./components",
            assets: "./assets",
            constants: "./constants",
            config: "./config",
            sagas: "./sagas",
            store: "./store",
            styles: "./styles",
            i18n: "./i18n",
            extensions: [".tsx", ".ts", ".js", ".json"],
          },
        },
      ],
      ["react-native-reanimated/plugin"],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["inline-dotenv"],
    ],
  };
};
