#!/usr/bin/env node

import {globby} from 'globby'

import yargs from 'yargs'
import fs from 'fs-extra'
import fsPath from 'path'

import { hideBin } from 'yargs/helpers'
import { transformAddTrans } from '../transform'

yargs(hideBin(process.argv))
  .command(
    'dry <glob>',
    'print out all files that match the glob with the trans added',
    () => {},
    async (argv) => {
      const paths = await globby([argv.glob as string])
      for (const path of paths) {
        const file = await fs.readFile(path, 'utf8')

        console.log(
          transformAddTrans(file, {
            filename: fsPath.basename(path),
          })
        )
      }
    }
  )
  .command(
    'addTrans <glob>',
    'transform all files that match the glob',
    () => {},
    async (argv) => {
      const paths = await globby([argv.glob as string])
      for (const path of paths) {
        const file = await fs.readFile(path, 'utf8')

        const transformed = transformAddTrans(file, {
          filename: fsPath.basename(path),
        })
        await fs.writeFile(path, transformed)
        console.log(`✅ ${path}`)
      }
    }
  )
  .demandCommand(1).argv
