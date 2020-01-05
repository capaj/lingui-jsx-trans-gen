import { PluginOptions, Visitor } from '@babel/core'

import BabelTypes from '@babel/types'

export interface Babel {
  types: typeof BabelTypes
}

export function linguiMacroGeneratorBabelPlugin(
  babel: Babel
): { visitor: Visitor<PluginOptions> } {
  const t = babel.types
  //   let addImport = false

  const traverser = {
    name: 'lingui-jsx-gen',
    visitor: {
      Program(_path, _opts) {
        // code = opts.file.code
      },
      JSXElement(path, _opts) {
        if (path.node.children.length > 0) {
          const hasTranslatableTextChild = path.node.children.find((node) => {
            return node.extra && node.extra.raw.replace(/\s/g, '').length > 0
          })
          if (hasTranslatableTextChild) {
            path.replaceWith(
              t.jsxElement(
                t.jsxOpeningElement(t.jsxIdentifier('Trans'), []),
                t.jsxClosingElement(t.jsxIdentifier('Trans')),
                [path.node],
                false
              )
            )
            path.skip()
          }
        }
      }
    }
  }
  return traverser
}
