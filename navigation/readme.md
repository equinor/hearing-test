# Navigation

## Routes
For simplicity, the application specific routes have been extracted to a seperate module called ```routes``` in this folder.

## Route parameters
If passing parameters to a route, you can map those parameters to props of the screen component by wrapping it in the ```mapParamsToProps``` function, available from the ```utils``` module in this folder.

```
import { mapParamsToProps } from './utils';

(...)

    SomeRoute: { 
        screen: mapParamsToProps(SomeComponent),
    },

(...)
```

## Navigate from outside components
The react navigation component is by default disconnected from redux.

To allow navigation from outside of components (like from a saga), you can use the ```service``` module in this folder. 

```
import { navigate } from '../navigation/service';

(...)

    yield call(navigate, 'RouteName', { params });

(...)
```
To connect react-navigation to redux, follow the instructions in the readme inside the ```connected``` folder.