
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { getproductsByCategory } from './api/getProducts'
import { screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from './atoms/SearchBar'
import { FlatList } from 'react-native-gesture-handler'
import ProductItem from './atoms/ProductItem'
import { useAppSelector } from '@store/reduxHook'
import { selectTotalItemsInCart } from '@modules/cart/api/slice'

const Product = () => {

    const route = useRoute()
    const category = route?.params as any;
    const count = useAppSelector(selectTotalItemsInCart);
    const [products, setProducts] = useState<any[]>([])

    const fetchProducts = async () => {
        const data = await getproductsByCategory(category?.id)
        setProducts(data)
    }

    useEffect(() => {
        if (category?.id) {
            fetchProducts()
        }
    }, [category?.id])

    const renderItem = ({ item, index}: any) => {
        const isOdd = index % 2 !== 0
        return (
            <ProductItem isOdd = {isOdd} item ={item} />
        )
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <SearchBar cartLength={count} />

            <FlatList
                bounces={false}
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                numColumns={2}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Oops! No items in this category</Text>
                    </View>
                }
                contentContainerStyle={styles.listContainer}
            />

        </View>
    )
}

export default Product

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E0E0E0"
    },
    listContainer: {
        paddingBottom: 30,
        backgroundColor: "#fff",
    },
    emptyContainer: {
        height: screenWidth - 80,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    emptyText: {
        fontSize: RFValue(14),
        color: '#666',
        marginBottom: 16,
    },

})