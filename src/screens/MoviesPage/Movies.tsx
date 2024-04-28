import React, { useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../../../store/store';
import { fetchData } from './../../../store/apiSlice'
import { SafeAreaView } from 'react-native-safe-area-context';

interface ListItem {
  id: string;
  title: string;
  imageUrl: string;
}

// Sample data
const data: ListItem[] = [
  { id: '1', title: 'Item 1', imageUrl: "https://cdn.pixabay.com/photo/2017/09/25/18/08/van-2786078_1280.jpg" },
  { id: '2', title: 'Item 2', imageUrl: "https://cdn.pixabay.com/photo/2017/09/25/18/08/van-2786078_1280.jpg" },
  { id: '3', title: 'Item 3', imageUrl: "https://cdn.pixabay.com/photo/2017/09/25/18/08/van-2786078_1280.jpg"},
  { id: '4', title: 'Item 4', imageUrl: "https://cdn.pixabay.com/photo/2017/09/25/18/08/van-2786078_1280.jpg" },
  { id: '5', title: 'Item 5', imageUrl: "https://cdn.pixabay.com/photo/2017/09/25/18/08/van-2786078_1280.jpg" },
  { id: '6', title: 'Item 6', imageUrl: "https://cdn.pixabay.com/photo/2017/09/25/18/08/van-2786078_1280.jpg"},
  { id: '7', title: 'Item 7', imageUrl: "https://cdn.pixabay.com/photo/2017/09/25/18/08/van-2786078_1280.jpg" },
  { id: '8', title: 'Item 8', imageUrl: "https://cdn.pixabay.com/photo/2017/09/25/18/08/van-2786078_1280.jpg" },
  { id: '9', title: 'Item 9', imageUrl: "https://cdn.pixabay.com/photo/2017/09/25/18/08/van-2786078_1280.jpg" },
];

const Movies: React.FC = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.api.loading);
  const error = useSelector((state: RootState) => state.api.error);
  const token = useSelector((state: RootState) => state.auth.token);
  

  console.log("token is", token)

  useEffect(() => {
    if (token) {
      dispatch(fetchData() as any);
    }
  }, [dispatch, token]);

  const renderItem = ({ item }: { item: ListItem }) => (
    <View style={styles.flatListContainer}>
      <Image style={styles.imageThumbnail} source={{ uri: item.imageUrl }} />
      <Text style={styles.text}>Priya</Text>
    
  </View>
  );

  return (

    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <FlatList
      columnWrapperStyle= {{justifyContent: 'space-between'}}
        data={data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: 'center',
    },
    flatListContainer:{
      backgroundColor: "#70a1ff",
      marginVertical: 10,
      marginHorizontal: 10,
      paddingBottom:10,
      borderRadius:6,
      justifyContent: 'center',
      alignItems: "center", 
      height: 150,
      width: "45%"
    },
  imageThumbnail: {
    width: "100%",
    height: "90%",
    borderTopLeftRadius :6,
    borderTopRightRadius :6
  },
  text: {
    fontSize: 14,
    paddingTop:2
  }
});

export default Movies;  