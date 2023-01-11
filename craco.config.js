const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)
const CracoAlias = require('craco-alias')

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: '.',
                tsConfigPath: './tsconfig.path.json',
            },
        },
    ],
}