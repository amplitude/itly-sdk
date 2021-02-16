---
to: packages/plugin-<%= name %>/tsconfig-esm.json
---
{
  "extends": "../../tsconfig-esm.json",
  "compilerOptions": {
    "rootDir": "lib",
    "outDir": "dist/esm"
  }
}
