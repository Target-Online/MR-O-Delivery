module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          "@screens" : './src/screens',
          "@navigation" : './src/navigation',
          "@components" : './src/components',
          "@screens" : './src/screens',
          "@navigation" : './src/navigation',
          "@constants" : './src/constants',
          "@assets" : './src/assets',
          "@context" : './src/context',
          "@utils" : './src/utils',
          "@actions" : './src/actions',
          "@api" : './src/api',
          "@layouts" : './src/layouts',
        },
      },
    ],
  ],
}