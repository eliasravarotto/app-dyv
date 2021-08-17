# Quasar App (apk-dyv-sa)

A Quasar Framework app

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).


### Generate keystore
$: keytool -genkey -alias eliaskey -keystore debug.keystore -dname "CN=Android Debug,O=Android,C=US" -keyalg RSA -keysize 2048 -validity 20000

$: jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore debug.keystore app-debug.apk eliaskey

$: zipalign -v 4 <path-to-same-apk-file> HelloWorld.apk