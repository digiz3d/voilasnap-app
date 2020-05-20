const version = '0.0.1'
const packageBundle = 'cf.voilasnap.app'

export default {
  name: 'VoilaSnap',
  slug: 'voilasnap-app',
  platforms: ['ios', 'android'],
  version,
  orientation: 'portrait',
  icon: './assets/icon.png',
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
  },
  android: {
    package: packageBundle,
    versionCode: 1,
    permissions: ['CAMERA'],
  },
}
