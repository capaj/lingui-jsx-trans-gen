import { transformSync } from '@babel/core'
import { linguiMacroGeneratorBabelPlugin, linguiAddImport } from './babelPlugin'

export const transformAddTrans = (code: string, configOverloads) => {
  code = transformSync(code, {
    parserOpts: {
      plugins: ['jsx', 'typescript'],
    },
    plugins: [linguiMacroGeneratorBabelPlugin],
    ...configOverloads,
  })?.code as string

  if (code.includes('</Trans>')) {
    code = transformSync(code, {
      parserOpts: {
        plugins: ['jsx', 'typescript'],
      },
      plugins: [linguiAddImport],
      ...configOverloads,
    })?.code as string
  }
  return code
}
