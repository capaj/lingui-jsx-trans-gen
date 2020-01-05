import fs from 'fs'
import { transform } from './transform'

describe('transform', () => {
  it('should add a Trans macro around translatable text', async () => {
    const simple = fs.readFileSync('./test-files/simple.tsx', {
      encoding: 'utf8'
    })
    expect(
      transform(simple, {
        filename: 'simple.tsx'
      })
    ).toMatchSnapshot()
  })
})
