import AsyncStorage from '@react-native-async-storage/async-storage';
import {Meal} from '../types';

const MY_FOOD_KEY = '@MyFood:key';

const useFoodStorage = () => {
  const handleSaveFood = async ({calories, name, portion}: Meal) => {
    try {
      const currentSavedFood = await AsyncStorage.getItem(MY_FOOD_KEY);

      if (currentSavedFood !== null) {
        const currentSavedFoodParsed = JSON.parse(currentSavedFood);
        currentSavedFoodParsed.push({
          name,
          calories,
          portion,
        });

        await AsyncStorage.setItem(
          MY_FOOD_KEY,
          JSON.stringify(currentSavedFoodParsed),
        );

        return Promise.resolve();
      }

      await AsyncStorage.setItem(
        MY_FOOD_KEY,
        JSON.stringify([
          {
            name,
            calories,
            portion,
          },
        ]),
      );

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const handleGetFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_FOOD_KEY);

      if (foods !== null) {
        const foodsParsed = JSON.parse(foods);
        return Promise.resolve(foodsParsed);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onGetFoods: handleGetFoods,
  };
};

export default useFoodStorage;
