/**
 * @format
 */

import { AppRegistry, Text, TextInput } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import {
    configureReanimatedLogger,
    ReanimatedLogLevel
} from 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//import { NativeModules } from 'react-native';
//NativeModules.DevSettings.setIsDebuggingRemotely(false);  // I uused to disable remote debugging

configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
});

if(Text.defaultProps){
    Text.defaultProps.allowFontScaling = false;
}else{
        Text.defaultProps = {}
        Text.defaultProps.allowFontScaling = false;
}


if(TextInput.defaultProps){
    TextInput.defaultProps.allowFontScaling = false;
}else{
        TextInput.defaultProps = {}
        TextInput.defaultProps.allowFontScaling = false;

}

// *** WRAP APP HERE ***
const Root = () => (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
    </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => Root);
