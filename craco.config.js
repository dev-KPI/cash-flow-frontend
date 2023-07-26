const path = require("path")

module.exports = {
    webpack: {
        alias: {
            "@components": path.resolve(__dirname,'./src/components'),
            "@pages": path.resolve(__dirname,'./src/pages'),
            "@assets": path.resolve(__dirname,'./src/assets'),
            "@hooks": path.resolve(__dirname,'./src/hooks'),
            "@store": path.resolve(__dirname,'./src/store'),
            "@UI_store": path.resolve(__dirname,'./src/store/UI_store'),
            "@animations": path.resolve(__dirname,'./src/components/animations'),
            "@services": path.resolve(__dirname,'./src/services'),
            "@styles": path.resolve(__dirname,'./src/styles'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
};