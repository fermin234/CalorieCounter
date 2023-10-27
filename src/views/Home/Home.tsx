import {View, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import useFoodStorage from '../../hooks/useFoodStorage';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Meal, TodayCaloriesProps} from '../../types';
import TodayCalories from '../../components/TodayCalories';
import TodayMeals from '../../components/TodayMeals';

const totalCaloriesPerDay = 2000;

const Home = () => {
  const {onGetToDayFood} = useFoodStorage();
  const [toDayFoods, setToDayFoods] = useState<Meal[]>([]);
  const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProps>({
    consumed: 0,
    remaining: 0,
    percentage: 0,
    total: 0,
  });

  const loadToDayFoods = useCallback(async () => {
    try {
      const toDayFoodsResponse = (await onGetToDayFood()) as Meal[];
      calculateTodayStatistics(toDayFoodsResponse);
      setToDayFoods(toDayFoodsResponse);
      return Promise.resolve(toDayFoodsResponse);
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }, []);

  const calculateTodayStatistics = (meals: Meal[]) => {
    try {
      const caloriesConsumed = meals?.reduce(
        (acum, curr) => acum + Number(curr.calories),
        0,
      );

      const remeainingCalories = totalCaloriesPerDay - caloriesConsumed;

      const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;

      setTodayStatistics({
        consumed: caloriesConsumed,
        remaining: remeainingCalories,
        percentage,
        total: totalCaloriesPerDay,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadToDayFoods().catch(null);
    }, [loadToDayFoods]),
  );

  return (
    <View style={styles.container}>
      <Header />
      <SubHeader />
      <TodayCalories {...todayStatistics} />
      <TodayMeals
        foods={toDayFoods}
        onCompleteAddRemove={() => loadToDayFoods()}
      />
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
