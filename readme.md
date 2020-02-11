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


# Mad-rn-generator cheat-sheet
## Sub generators
The following sub-generators are available:
### :data-entity
Create a folder with the following files inside of ```app/store```:
* actions.js
* reducer.js
* reducer.spec.js
* saga.js
* index.js

Arguments:
* entityName: (string) name that will be used for naming actions, selectors, saga and folder
* actionType: (optional string) verb to use as prefix for actions. Defaults to ```fetch``` 

Example:
```
yo mad-app:data-entity Feed [fetch]
```

### :container
Stubs a container component and save it to ```app/containers```. A container component is normally a top-level component that includes a feature's logic and that is connection to redux (if applicable).

Arguments:
* componentName: (string) Name of component

Example:
```
yo mad-app:container FeedPage
```

### :component
Stubs a view component and save it to ```app/components``` (or the folder the command is run from if inside this folder). A view component should be agnostic of the redux store and only relay on data through props. It should not contain logic besides presentation logic.

Arguments:
* componentName: (string) Name of component
* stateless: (optional bool) If it should be created as a pure function. Otherwise it will default to creating a js class.

Example:
```
yo mad-app:component FeedList [true]
```

### :version
Update the version number in package.json and the ios and android projects if applicable.

Arguments:
* version: (string) New version number

Example:
```
yo mad-app:version 1.1.0
```
