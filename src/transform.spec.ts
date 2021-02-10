import fs from 'fs'
import { transformAddTrans } from './transform'

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
})
