import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { type FC } from 'react'
import { FONTS, screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { FlatList } from 'react-native-gesture-handler'
import { navigate } from '@navigation/NavigationUtil'

const AimatedHorizontalList:FC<{data: any}> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style ={styles.textStyle}>
        {data?.title}
      </Text>

      <FlatList
            data = {data?.data}
            horizontal
            keyExtractor={(item) => item?.id}
            style = {{ paddingHorizontal: 15 }}
            renderItem = {({ item, index}) =>(
              <Pressable key={index} style={styles.imageContainer} onPress={() => navigate("Categories")}>
                  <Image source={{uri: item?.image_uri}} style = {styles.image}/>
              </Pressable>
            )}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            />
    </View>
  )
}

export default AimatedHorizontalList

const styles = StyleSheet.create({
    container:{
        marginVertical:15,
    },
    image:{
        width: "100%",
        height: "100%",
      
    },
    textStyle:{
        fontSize: RFValue(14),
        fontFamily:FONTS.heading,
        marginVertical:15,
        marginBottom:15,
    },
    imageContainer:{
        width: screenWidth * 0.4,
        height: screenWidth * 0.4,
        marginRight:12,
    },

})