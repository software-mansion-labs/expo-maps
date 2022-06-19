const { withAndroidManifest, AndroidConfig } = require('@expo/config-plugins');

const { addMetaDataItemToMainApplication, getMainApplicationOrThrow } =
  AndroidConfig.Manifest;

module.exports = function withExpoMaps(config) {
  return withAndroidManifest(config, async (config) => {
    config.modResults = await setCustomConfigAsync(config, config.modResults);
    return config;
  });
};

async function setCustomConfigAsync(config, androidManifest) {
  const googleApiKeys = require('./google-maps-api-keys.json');
  const mainApplication = getMainApplicationOrThrow(androidManifest);

  addMetaDataItemToMainApplication(
    mainApplication,
    // value for `android:name`
    'com.google.android.geo.API_KEY',
    // value for `android:value`
    googleApiKeys.googleMapsApiKey
  );

  return androidManifest;
}
