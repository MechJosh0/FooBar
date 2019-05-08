# FooBar
A Chrome Extension for NULS Blockchain. Currently in testing stages.

----------------

# Download Locally
Download the [latest release](https://github.com/MechJosh0/FooBar/releases) and load the extension manually into your Chrome browser.

Extract the release files into a new seperate folder. The directory holding the manifest file can be added as an extension in developer mode in its current state.

1. Open the Extension Management page by navigating to [chrome://extensions](chrome://extensions).
	* The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.

2. Enable Developer Mode by clicking the toggle switch next to Developer mode.

3. Click the LOAD UNPACKED button and select the extension directory.

----------------

# TODO
> Top level todo list in order of importance
- Create an app name
- Create and implement a design
- Write tests
- BIP39+password (seed) solution
- API backend for getting blockchain and price data
- SocketIO for sending live data when needed and FireBase for push notifications (when idle)

----------------

# Development

## Project setup
```cmd
npm i
```

### Compiles and hot-reloads for development
```cmd
npm run serve
```

### Compiles and minifies for production
```cmd
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
