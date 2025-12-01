
import { StyleSheet, Text, View } from 'react-native'
import React, { useState, type FC } from 'react'
import { AnimatedView } from 'react-native-reanimated/lib/typescript/component/View'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { menuData } from '@utils/db';
import MenuItem from '../atoms/MenuItem';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from '@components/atoms/Icon';
import { Colors } from '@utils/Constants';

const MenuHeader: FC<{ scrollY: any }> = ({ scrollY }) => {

    const [focusedIndex, setFocusedIndex] = useState(0)

    const opacityFadingStyyles = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [0, 80], [1, 0])
        return {
            opacity
        }
    })

    return (
        <Animated.View style={[styles.container,]}>
            {/* <SafeAreaView/> */}
            <View style={styles.flexRow}>
                {menuData.map((item, index) => (
                    <MenuItem
                        key={index}
                        item={item}
                        isFocused={focusedIndex === index}
                        onSelect={() => setFocusedIndex(index)}
                    />
                ))}
            </View>

            <View style={styles.addressContainer}>
                <Icon size={16} name='home' iconFamily='Ionicons' />
                <Text style={styles.homeText}>HOME</Text>
                <Text numberOfLines={1} style={styles.homeText}>Pisarve Taloja, Navi Mumbai</Text>
                <Icon size={16} name='chevron-forward-sharp' iconFamily='Ionicons' />

            </View>
        </Animated.View>
    )
}

export default MenuHeader

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 5,
    },
    homeText: {
        marginHorizontal: 5,
        fontWeight: "bold",
        color: Colors.text,
        //fontSize:RFValue(10)
    },
    addressText: {
        flex: 1,
        color: Colors.text,
        fontSize: RFValue(9)
    }
})