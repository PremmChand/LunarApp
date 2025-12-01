import { StyleSheet,SafeAreaView, Text, View} from 'react-native'
import { Colors } from '@utils/Constants'
import type { FC,  ReactNode } from 'react';
 import type { ViewStyle } from "react-native";


interface CustomSaferAreaViewProps {
    children: ReactNode;
    style?: ViewStyle;
}

const CustomSaferAreaView : FC<CustomSaferAreaViewProps> = ({children, style}) => {
  return (
    <View style ={[styles.container, style]}>
        <SafeAreaView/>
        {children}
    </View>
  )
}

export default CustomSaferAreaView;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.background,
    }
})