import { transformSync } from '@babel/core'

export const transform = (code: string, configOverloads) => {
  return transformSync(code, {
    presets: ['@babel/preset-typescript'],
    plugins: ['@babel/plugin-proposal-optional-chaining'],
    ...configOverloads
  })?.code
}
