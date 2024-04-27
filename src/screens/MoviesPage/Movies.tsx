
import React, { useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../../../store/store';
import { fetchData } from './../../../store/apiSlice';

interface ListItem {
  id: string;
  title: string;
}

// Sample data
const data: ListItem[] = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  { id: '5', title: 'Item 5' },
  { id: '6', title: 'Item 6' },
  { id: '7', title: 'Item 7' },
  { id: '8', title: 'Item 8' },
  { id: '9', title: 'Item 9' },
];

const Movies: React.FC = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.api.loading);
  const error = useSelector((state: RootState) => state.api.error);
  const token = useSelector((state: RootState) => state.auth.token);
  

  console.log("token is", token)

  useEffect(() => {
    if (token) {
      dispatch(fetchData());
    }
  }, [dispatch, token]);


  const renderItem = ({ item }: { item: ListItem }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
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
    paddingTop: 22,
    backgroundColor: 'pink'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    width: 200,
    backgroundColor: 'green'
  },
});

export default Movies;