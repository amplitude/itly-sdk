---
to: packages/sdk-<%= name %>/tsconfig-esm.json
---
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "module": "es2015",
        "moduleResolution": "node",
        "outDir": "./dist/esm"
    }
}
