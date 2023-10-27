import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import {  Product, Restaurant } from '../../../types/billing';
import { Button, Card } from 'react-native-paper';
import tw from '../../../utils.js/tw';
import { APP_ROUTES } from '../../../router/RootNavigation';
import Row from '../../common/Row';
import { fetchBilling } from '../../../services/appService';
import { transformObjectToArray } from '../../../utils.js/helpers';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { useAppStore } from '../../../store/appStore';

function RestaurantInfo() {
    const route = useRoute<RouteProp<{
        params: {
            restaurant: Restaurant
        }
    }>>(); 
    const restaurant = route.params?.restaurant;
    const { addToCart } = useAppStore();
 

    const renderFood = ({item, index}: { item: Product; index: number }) => {
        return <View style={tw`my-2`}>
            <Card>
                <Card.Cover source={{ uri: item.image }} />

                <Card.Title title={item.name} right={() =>
                    <View style={tw`flex-col center-v`}>
                        <Text style={tw`pr-4`}>Price: ₹{item.price}</Text>
                        <Button onPress={()=> addToCart(item)}> Add to cart</Button>
                    </View>
                } />
            </Card>
        </View>
    }

    return (
        <View style={tw`flex flex-1`}>
            <View style={tw`flex flex-1.4`}>
                <Card.Cover source={{ uri: restaurant.image }} />
                <View style={tw`px-4`}>
                    <View style={tw`flex-row`}> 
                        <Text style={tw`text-xl`}>{restaurant.name}</Text> 
                    </View>
                    <Row label="Distance: " value={restaurant.distance} /> 
                    <StarRatingDisplay
                        rating={restaurant.rating}
                        starSize={20}
                    />  
                </View>
                <Text style={tw`text-xl text-center mb-2`}>Available Foods</Text>
            </View>
            <View style={tw`flex flex-2`}>
                <FlatList
                    data={restaurant.products}
                    renderItem={renderFood}
                    keyExtractor={(_, index) => index.toString()}
                />
            </View> 
        </View >
    )
}

export default RestaurantInfo