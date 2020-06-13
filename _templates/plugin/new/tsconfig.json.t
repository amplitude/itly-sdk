---
to: packages/plugin-<%= name %>/tsconfig.json
---
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "declaration": true,
        "outDir": "./dist",
        "strict": true,
        "esModuleInterop": true
    },
    "include": [
        "lib/**/*"
    ],
    "exclude": [
        "node_modules",
        "coverage",
        "dist",
        "**/__tests__/**",
        "**/__mocks__/**",
    ]
}
