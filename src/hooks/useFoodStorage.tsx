import AsyncStorage from '@react-native-async-storage/async-storage';
import {Meal} from '../types';
import isToday from 'date-fns/isToday';

const MY_FOOD_KEY = '@MyFood:key';
const MY_TODAY_FOOD_KEY = '@MyTodayFood:key';

const useFoodStorage = () => {
  const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
    try {
      const currentSavedFood = await AsyncStorage.getItem(storageKey);

      if (currentSavedFood !== null) {
        const currentSavedFoodParsed = JSON.parse(currentSavedFood);
        currentSavedFoodParsed.push(meal);

        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSavedFoodParsed),
        );

        return Promise.resolve();
      }

      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const handleSaveFood = async ({calories, name, portion}: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_FOOD_KEY, {
        name,
        calories,
        portion,
      });
      return Promise.resolve(result);
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

  const handleSaveDayFoods = async ({calories, name, portion}: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        calories,
        name,
        portion,
        date: new Date().toISOString(),
      });

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const handleGetToDayFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);

      if (foods !== null) {
        const foodsParsed = JSON.parse(foods) as Meal[];
        return Promise.resolve(
          foodsParsed.filter(meal => meal.date && isToday(new Date(meal.date))),
        );
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const handleRemoveToDayFood = async (index: number) => {
    try {
      const todayFood = await handleGetToDayFoods();
      const filterItem = todayFood?.filter((item: Meal, itemIndex: number) => {
        return itemIndex !== index;
      });

      await AsyncStorage.setItem(MY_TODAY_FOOD_KEY, JSON.stringify(filterItem));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onGetFoods: handleGetFoods,
    onSaveToDayFood: handleSaveDayFoods,
    onGetToDayFood: handleGetToDayFoods,
    onRomoveTodayFood: handleRemoveToDayFood,
  };
};

export default useFoodStorage;
