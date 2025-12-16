import fs from 'node:fs'
import { transformAddTrans } from './transform'

import { describe, expect, it } from 'bun:test'

describe('transform', () => {
  it('should add a Trans macro around translatable text', async () => {
    const simple = fs.readFileSync('./test-files/simple.tsx', {
      encoding: 'utf8',
    })
    expect(
      transformAddTrans(simple, {
        filename: 'simple.tsx',
      })
    ).toMatchSnapshot()
  })

  it('should not add anything', async () => {
    const simple = fs.readFileSync('./test-files/noText.tsx', {
      encoding: 'utf8',
    })
    expect(
      transformAddTrans(simple, {
        filename: 'simple.tsx',
      })
    ).toMatchSnapshot()
  })

  it('should just add one', async () => {
    const simple = fs.readFileSync('./test-files/sample2.tsx', {
      encoding: 'utf8',
    })
    expect(
      transformAddTrans(simple, {
        filename: 'sample2.tsx',
      })
    ).toMatchSnapshot()
  })

  it('should not double wrap existing Trans', async () => {
    const simple = fs.readFileSync('./test-files/alreadyTrans.tsx', {
      encoding: 'utf8',
    })
    expect(
      transformAddTrans(simple, {
        filename: 'alreadyTrans.tsx',
      })
    ).toMatchSnapshot()
  })
})
