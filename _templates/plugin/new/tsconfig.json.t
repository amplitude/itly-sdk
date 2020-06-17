---
to: packages/plugin-<%= name %>/tsconfig.json
---
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "rootDir": "lib",
    "outDir": "dist"
  }
}
