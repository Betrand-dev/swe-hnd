const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Tell Metro to treat '.md' files as bundle assets
config.resolver.assetExts.push('md');

module.exports = config;
