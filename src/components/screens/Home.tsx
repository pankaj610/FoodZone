import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import tw from "../../utils.js/tw"; 
import { Card } from "react-native-paper";
import { useAppStore } from "../../store/appStore";  
import { Product, Restaurant } from "../../types/billing";
import { useNavigation } from "@react-navigation/native";
import { APP_ROUTES } from "../../router/RootNavigation";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
 

const Home = () => {
  const { restaurants, getTodaysCustomers, getCustomer } = useAppStore();
  const [search, setSearchText] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    // if (search != null && search != "") {
    //   getTodaysCustomers();
    // } else {
    // }
    getCustomer(search);
  }, [search]);

  const renderProduct = ({ item }: { item: Restaurant }) => {

    const navigateToBills = () => {
      navigation.navigate(APP_ROUTES.RESTAURANT_INFO.name, { restaurant: item });
    }

    return <TouchableOpacity style={tw`my-2`} onPress={navigateToBills}>
      <Card>
        <Card.Cover source={{ uri: item.image }} />
        
        <Card.Title title={item.name} right={()=> 
        <View style={tw`flex-col center-v`}>
            <StarRatingDisplay
              rating={item.rating}
              starSize={20} 
            />
            <Text style={tw`pr-4`}>Distance: {item.distance}</Text>
          </View>
        } />
      </Card>
    </TouchableOpacity>
  }

  return (
    <View style={tw`flex flex-1 flex-col`}>
      <View style={tw`flex flex-col px-3`}>
        <Text style={tw`title text-black py-2 text-center`}>Food Zone</Text>
      </View>

      <View style={tw`flex flex-1 w-full px-3`}>
        {restaurants.length === 0 && <Text style={tw`title text-center`}>No Restaurants</Text>}
        {restaurants.length > 0 && <FlatList
          data={restaurants}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
        />}
      </View>

    </View>
  );

}




export default Home;
