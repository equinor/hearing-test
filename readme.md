# React Native template app

A React Native app, which serves as a template for the [mad-app](https://github.com/Statoil/mad-rn-generator) yeoman generator project.

## Prerequisites

* [CocoaPods](https://cocoapods.org/) (for IOS version)
  * Smart to run ```pod setup``` before starting
* [Node](nodejs.org)
* [React-Native CLI](https://facebook.github.io/react-native/docs/getting-started.html)


## installing/running
*NOTE* To create an app for a new project, you must use the [mad-app](https://github.com/Statoil/mad-rn-generator) yeoman generator.

Otherwise, clone and ```npm install```, then ```npm run ios``` or ```npm run android```.

## Notes about Podfile and react-native link
When a Podfile is present, the ```react-native link``` command will not automatically add .h/.m/.a files to the IOS project, and you have to do this manually in XCode. 

A workaround for this is to: 
1) rename the ```Podfile``` to something like ```Podfile.bak```
2) npm install the new dependencies (which includes native code)
3) run ```react-native link```
4) rename ```Podfile.bak``` back to ```Podfile``` (not required unless you want to do a new pod install)
