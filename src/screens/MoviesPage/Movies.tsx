
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../../../store/store';
import { fetchData } from './../../../store/apiSlice'
import { SafeAreaView } from 'react-native-safe-area-context';

interface ListItem {
  id: string;
  title: string;
  imageUrl: string;
}

const Movies: React.FC = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.api.loading);
  const data = useSelector((state: RootState) => state.api.data);
  const error = useSelector((state: RootState) => state.api.error);
  const token = useSelector((state: RootState) => state.auth.token);

  const [page, setPage] = useState(1);

  function isObjectEmpty(obj: {}) {
    return Object.keys(obj).length === 0;
  }

  const responseData: ListItem[] = !isObjectEmpty(data) ? data.map((item: any) => {
    return {
      id: item.id,
      title: item.title,
      imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`
    }
  }) : [];

  useEffect(() => {
    if (token) {
      dispatch(fetchData(page) as any);
    }
  }, [dispatch, token, page]);

  const renderItem = ({ item }: { item: ListItem }) => (
    <View style={styles.flatListContainer}>
      <Image style={styles.imageThumbnail} source={{ uri: item.imageUrl }} />
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  const loadNextPage = () => {
    setPage(page + 1)
  }

  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      {loading ? (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          data={responseData}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.5}
          onEndReached={loadNextPage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center',
  },
  flatListContainer: {
    backgroundColor: "lightgrey",
    marginVertical: 10,
    marginHorizontal: 10,
    paddingBottom: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: "center",
    height: 150,
    width: "45%"
  },
  imageThumbnail: {
    width: "100%",
    height: "90%",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  text: {
    fontSize: 14,
    paddingTop: 2,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
  },
  overlay:{
    flex:1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Movies;  
