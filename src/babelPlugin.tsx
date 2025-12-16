import { PluginOptions, Visitor } from '@babel/core'

import BabelTypes from '@babel/types'

export interface Babel {
  types: typeof BabelTypes
}

export function linguiMacroGeneratorBabelPlugin(babel: Babel): {
  visitor: Visitor<PluginOptions>
} {
  const t = babel.types
  const traverser = {
    name: 'lingui-jsx-gen',
    visitor: {
      JSXElement(path, _opts) {
        const openingName = path.node.openingElement.name
        if (t.isJSXIdentifier(openingName) && openingName.name === 'Trans') {
          return
        }

        if (path.node.children.length > 0) {
          const hasTranslatableTextChild = path.node.children.find((node) => {
            return node.extra && node.extra.raw.replace(/\s/g, '').length > 0
          })
          if (hasTranslatableTextChild) {
            path.replaceWith(
              t.jsxElement(
                path.node.openingElement,
                path.node.closingElement,
                [
                  t.jsxElement(
                    t.jsxOpeningElement(t.jsxIdentifier('Trans'), []),
                    t.jsxClosingElement(t.jsxIdentifier('Trans')),
                    path.node.children
                  ),
                ],
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
  const t = babel.types
  const newLinguiMacroModule = '@lingui/macro'
  const oldLinguiReactMacroModule = '@lingui/react/macro'
  const linguiImport = babel.template(
    `import { Trans } from '${newLinguiMacroModule}'\n`,
    {
      sourceType: 'module',
    }
  )

  const traverser = {
    name: 'lingui-jsx-gen',
    visitor: {
      Program(path) {
        const importDeclPaths = path
          .get('body')
          .filter((p) => p.isImportDeclaration())

        const hasTransImportSpecifier = (p): boolean =>
          p.node.specifiers.some(
            (s) =>
              t.isImportSpecifier(s) &&
              t.isIdentifier(s.imported) &&
              s.imported.name === 'Trans'
          )

        const existingMacroImport =
          importDeclPaths.find(
            (p) => p.node.source.value === newLinguiMacroModule
          ) ??
          importDeclPaths.find(
            (p) => p.node.source.value === oldLinguiReactMacroModule
          )

        if (existingMacroImport) {
          if (existingMacroImport.node.source.value !== newLinguiMacroModule) {
            existingMacroImport.node.source.value = newLinguiMacroModule
          }

          if (!hasTransImportSpecifier(existingMacroImport)) {
            existingMacroImport.node.specifiers.push(
              t.importSpecifier(t.identifier('Trans'), t.identifier('Trans'))
            )
          }
          return
        }

        const lastImport = importDeclPaths.at(-1)
        if (lastImport) lastImport.insertAfter(linguiImport())
        else path.unshiftContainer('body', linguiImport())
      },
    },
  }
  return traverser
}
