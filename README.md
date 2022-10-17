# lingui-jsx-trans-gen

wraps your JSX text nodes in `Trans` macro automagically

run this command: `npx lingui-jsx-trans-gen addTrans "./src/*.tsx"` and all tsx files in `src` folder should get the Trans added.

⚠️ you must include the quotes for the glob expression

For now it only works with typescript `tsx` files.

# how to use this in vscode

The most convenient way to use this for a single file is probably with this vscode plugin: `adrianwilczynski.terminal-commands`
Just define a custom command like this:

```json
{
  "command": "npx lingui-jsx-trans-gen addTrans {resource}",
  "name": "lingui-jsx-trans-gen",
  "auto": true
}
```
