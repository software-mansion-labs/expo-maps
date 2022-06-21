const { withInfoPlist } = require('@expo/config-plugins');

module.exports = function withExpoMaps(config) {
  const googleApiKeys = require('./google-maps-api-keys.json');
  return withInfoPlist(config, (config) => {
    config.modResults.GoogleMapsApiKey = googleApiKeys.googleMapsApiKey;
    return config;
  });
};
