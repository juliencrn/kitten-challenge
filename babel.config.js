module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".ts", ".tsx", ".jpeg", ".jpg", ".json"],
          root: ["./src"],
          alias: { "~": "./src", "~test": "./src" },
        },
      ],
    ],
  }
}
