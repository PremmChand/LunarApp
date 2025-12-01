

import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, type FC } from 'react';
import { screenHeight, screenWidth } from '@utils/Constants';
import FlimSlip from '../molecules/FlimSlip';
import { RFValue } from 'react-native-responsive-fontsize';
import { Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Dots from '../atoms/Dots';



const AddCarousel:FC<{data:any}> = ({data}) => {
  const [active, setActive] = useState(0)
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 0.8
  }

  return (
    <View>
      <FlimSlip />

      <Carousel
      {...baseOptions}
      loop
      pagingEnabled
      snapEnabled
      autoPlay
      autoPlayInterval={3500}
      onSnapToItem ={(index:any) => setActive(index)}
      data = {data.data}
      renderItem = {({item}:any) => (
        <Pressable style ={styles.imageContainer}>
          <Image
          source ={item?.image_uri}
          style = {styles.img}/>
        </Pressable>

      )}
      />
      {
         active!= null && 
         <View style = {styles.dots}>
          {
            data?.data?.map((item:any, index:any) =>{
              return(
                <Dots
                active ={active}
                index ={index}
                key={index}
                />
              )
            })
          }
          </View>
      }
    </View>
  )
}

export default AddCarousel

const styles = StyleSheet.create({
  imageContainer :{
    height: "100%",
    width:"100%"
  },
  dots:{
    flexDirection:"row",
    width:100,
    alignSelf:'center',
    marginTop:10,
    justifyContent:"center"
  },
  img:{
    height: "100%",
    width:"100%",
    resizeMode:"cover"
  },
})