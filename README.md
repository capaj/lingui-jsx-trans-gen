# lingui-jsx-trans-gen

wraps your JSX text nodes in `Trans` macro automagically

run this command: `npx lingui-jsx-trans-gen ./src/*.tsx` and all in `src` folder

For now it only works with typescript `tsx` files.

# how to use this in vscode

THe most convenient way to use this is probably with this vscode plugin: `adrianwilczynski.terminal-commands`
Just define a custom command like this:

```json
{
  "command": "lingui-jsx-trans-gen addTrans {resource}",
  "name": "lingui-jsx-trans-gen",
  "auto": true
}
```
