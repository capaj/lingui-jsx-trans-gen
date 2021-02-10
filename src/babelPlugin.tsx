import { PluginOptions, Visitor } from '@babel/core'

import BabelTypes from '@babel/types'

export interface Babel {
  types: typeof BabelTypes
}

export function linguiMacroGeneratorBabelPlugin(
  babel
): { visitor: Visitor<PluginOptions> } {
  const t = babel.types
  const traverser = {
    name: 'lingui-jsx-gen',
    visitor: {
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
      },
    },
  }
  return traverser
}

export function linguiAddImport(babel): { visitor: Visitor<PluginOptions> } {
  const linguiImport = babel.template(
    `import { Trans } from '@lingui/macro'\n`,
    {
      sourceType: 'module',
    }
  )

  const traverser = {
    name: 'lingui-jsx-gen',
    visitor: {
      Program(path) {
        const lastImport = path
          .get('body')
          .filter((p) => p.isImportDeclaration())
          .pop()

        if (lastImport) lastImport.insertAfter(linguiImport())
      },
    },
  }
  return traverser
}
