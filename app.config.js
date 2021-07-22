const version = '0.0.1'
const packageBundle = 'cf.voilasnap.app'

export default {
  name: 'VoilaSnap',
  slug: 'voilasnap-app',
  version,
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: packageBundle,
    buildNumber: version,
    supportsTablet: true,
    userInterfaceStyle: 'automatic',
  },
  android: {
    package: packageBundle,
    versionCode: 1,
    permissions: ['CAMERA'],
    userInterfaceStyle: 'automatic',
  },
}
