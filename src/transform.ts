import { transformSync } from '@babel/core'
import { linguiMacroGeneratorBabelPlugin, linguiAddImport } from './babelPlugin'

export const transformAddTrans = (code: string, configOverloads) => {
  code = transformSync(code, {
    presets: ['@babel/preset-typescript'],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      linguiMacroGeneratorBabelPlugin,
    ],
    ...configOverloads,
  })?.code as string

  if (code.includes('</Trans>')) {
    code = transformSync(code, {
      presets: ['@babel/preset-typescript'],
      plugins: ['@babel/plugin-proposal-optional-chaining', linguiAddImport],
      ...configOverloads,
    })?.code as string
  }
  return code
}
