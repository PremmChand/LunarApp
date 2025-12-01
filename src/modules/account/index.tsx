
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useAppSelector } from '@store/reduxHook'
import { getOrderByUserId } from './api/api'
import CustomSaferAreaView from '@components/atoms/CustomSaferAreaView'
import { orderStyles } from '@styles/orderStyles'
import { FlatList } from 'react-native-gesture-handler'
import LoginModal from './api/molecules/LoginModal'
import { formatDate } from '@utils/Constants'

const Account = () => {

  const route = useRoute()
  const item = route?.params as any
  const user = useAppSelector(state => state.account.user) as any
  const [isVisible, setIsVisible] = useState(false)
  const [orders, setOrders] = useState<any[]>([])

  const fetchOrder = async () => {
    const data = await getOrderByUserId(user?._id)
    if (data) {
      setOrders(data)
    }
  }
  useEffect(() => {
    if (user) {
      fetchOrder()
    } else {
      setOrders([])
    }
  }, [user])

  useEffect(() => {
    if (item?.isRefresh && user) {
      fetchOrder()
    }
  }, [item])


 const renderItem = ({ item }: any) => {
  const product = item?.Product; // For orders API, the key is Product
  if (!product) return null; // skip if missing

  return (
    <View style={orderStyles.orderContainer}>
      <Image
        source={{ uri: product.image_uri }}
        style={orderStyles.image}
        resizeMode="contain"
      />
      <View style={orderStyles.orderDetails}>
        <Text style={orderStyles.itemName}>
          {`${item.quantity} x ${product.name}`}
        </Text>
        <Text style={orderStyles.price}>₹{product.price}</Text>
      </View>
    </View>
  )
}



  return (
    <>
      <CustomSaferAreaView>
        <View style={orderStyles.container}>
          <Text style={orderStyles.heading}>{user ? user?.phone : "Account"}</Text>
          <View style={orderStyles.flexRow}>
            <Text style={orderStyles.subHeading}>{user ? user?.address : "Login inn to get exclusive offers"}</Text>
            <TouchableOpacity style={orderStyles.btn} onPress={() => setIsVisible(true)}>
              <Text style={orderStyles.btnText}>{user ? "Update" : "Login"}</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={orderStyles.listContainer}>
          <Text style={orderStyles.heading}>Your Orders</Text>
          <FlatList
            data={orders}
            keyExtractor={(item) => item?._id.toString()}
            renderItem={({ item }) => (
              <View style={orderStyles.order}>
                <FlatList
                  data={item?.item}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                  scrollEnabled={false}
                />
                <Text style={orderStyles.address}>
                  {item?.address}
                </Text>

                <Text style={orderStyles.deliveryDate}>
                  Delivery by : {formatDate(item?.deliveryDate)}
                </Text>
                <View style={orderStyles.statusContainer}>
                  <Text style={orderStyles.statusText}>{item?.status}</Text>
                </View>
              </View>
            )}

            ListEmptyComponent={
              <View>
                <Text style={orderStyles.emptyText}>
                  {!user ? "LOGIN TO PLACE YOUR ORDERS" : "THERE ARE NO NEW ORDERS."}
                </Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
        </View>

      </CustomSaferAreaView>

      < LoginModal onClose={() => setIsVisible(false)} visible={isVisible} />
    </>
  )
}

export default Account

const styles = StyleSheet.create({

})