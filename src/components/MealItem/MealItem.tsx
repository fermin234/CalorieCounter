import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {Meal} from '../../types';
import {FC} from 'react';
import {Button} from '@rneui/themed';
import useFoodStorage from '../../hooks/useFoodStorage';

const MealItem: FC<Meal> = ({name, calories, portion}) => {
  const {onSaveToDayFood} = useFoodStorage();

  const handleAddItemPress = async () => {
    try {
      await onSaveToDayFood({calories, name, portion});
      return Alert.alert('Comida agregada al dia.');
    } catch (err) {
      console.error(err);
      return Alert.alert('Comida no agregada.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button type="clear" onPress={handleAddItemPress}>
          <Image
            source={require('../../assets/icons/add.png')}
            style={styles.iconAdd}
          />
        </Button>
        <Text style={styles.calories}>{calories} cal.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ade8af',
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  portion: {
    color: '#808080',
    fontWeight: '500',
    fontSize: 13,
  },
  calories: {
    fontSize: 18,
  },
  iconAdd: {
    width: 20,
    height: 20,
  },
});

export default MealItem;
