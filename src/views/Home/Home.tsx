import {Text, View, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import useFoodStorage from '../../hooks/useFoodStorage';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Meal} from '../../types';

const Home = () => {
  const {onGetToDayFood} = useFoodStorage();
  const [toDayFoods, setToDayFoods] = useState<Meal[]>([]);

  const loadToDayFoods = useCallback(async () => {
    try {
      const toDayFoodsResponse = await onGetToDayFood();
      setToDayFoods(toDayFoodsResponse);
      return Promise.resolve(toDayFoodsResponse);
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }, []);

  useFocusEffect(() => {
    console.log('enfocada');

    // useCallback(() => {
    //   loadToDayFoods().catch(null);
    // }, [loadToDayFoods]),
  });

  return (
    <View style={styles.container}>
      <Header />
      <SubHeader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
  },
});

export default Home;
