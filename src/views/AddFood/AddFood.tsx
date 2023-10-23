import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import {Button, Image, Input} from '@rneui/themed';
import AddFoodModal from '../../components/AddFoodModal';
import {useEffect, useState} from 'react';
import useFoodStorage from '../../hooks/useFoodStorage';
import {Meal} from '../../types';
import MealItem from '../../components/MealItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFood = () => {
  const [foods, setFoods] = useState<Meal[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const {onGetFoods} = useFoodStorage();

  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFoods();
      setFoods(foodsResponse);
    } catch (err) {
      console.error(err);
    }
  };

  const onClose = async (shouldUpdate?: boolean) => {
    shouldUpdate && (Alert.alert('Comida guardada exitosamente.'), loadFoods());
    setIsOpen(!isOpen);
  };

  const handleSearchPress = async () => {
    try {
      const result = await onGetFoods();
      setFoods(
        result.filter((item: Meal) =>
          item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        ),
      );
    } catch (err) {
      console.error(err);
      setFoods([]);
    }
  };

  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}> Add Food</Text>
        </View>
        <View style={styles.addFoodButtonContainer}>
          <Button radius="lg" color="#4ecb71">
            <Image
              source={require('../../assets/icons/add.png')}
              style={styles.iconAdd}
              onPress={() => setIsOpen(true)}
            />
          </Button>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="apples, pie, soda"
            value={search}
            onChangeText={(text: string) => setSearch(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Search"
            radius="lg"
            color="#ade8af"
            titleStyle={styles.searchButtonTitle}
            onPress={handleSearchPress}
          />
        </View>
      </View>
      <View>
        <AddFoodModal isOpen={isOpen} onClose={onClose} />
      </View>
      <View style={styles.containerFoods}>
        <ScrollView style={styles.content}>
          {foods?.map((meal: Meal) => (
            <MealItem key={`my-meal-item-${meal.name}`} {...meal} isAbleToAdd />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'white',
    flex: 1,
  },
  content: {},
  addFoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  legendContainer: {
    flex: 1,
  },
  addFoodButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconAdd: {
    width: 30,
    height: 30,
  },
  addFoodLegend: {
    fontSize: 20,
  },
  searchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
  searchButtonTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: 12,
  },
  containerFoods: {
    flex: 1,
  },
});

export default AddFood;
