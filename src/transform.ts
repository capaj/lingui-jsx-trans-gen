import { transformSync } from '@babel/core'
import { linguiMacroGeneratorBabelPlugin } from './babelPlugin'

export const transform = (code: string, configOverloads) => {
  return transformSync(code, {
    presets: ['@babel/preset-typescript'],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      linguiMacroGeneratorBabelPlugin
    ],
    ...configOverloads
  })?.code
}
