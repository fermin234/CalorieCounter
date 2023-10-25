import {FC} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Meal, TodayMealsProps} from '../../types';
import MealItem from '../MealItem';

const TodayMeals: FC<TodayMealsProps> = ({foods, onCompleteAddRemove}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foods</Text>
      <ScrollView style={styles.content}>
        {foods?.map((meal: Meal, i) => (
          <MealItem
            key={`today-meal-item-${meal.name}- ${i}`}
            {...meal}
            onCompleteAddRemove={onCompleteAddRemove}
            itemPosition={i}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  content: {
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
  },
});

export default TodayMeals;
