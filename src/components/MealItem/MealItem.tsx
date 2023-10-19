import {Image, StyleSheet, Text, View} from 'react-native';
import {Meal} from '../../types';
import {FC} from 'react';
import {Button} from '@rneui/themed';

const MealItem: FC<Meal> = ({name, calories, portion}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button>
          <Image source={{uri: ''}} />
        </Button>
        <Text style={styles.calories}>{calories}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  leftContainer: {},
  rightContainer: {},
  name: {},
  portion: {},
  calories: {},
});

export default MealItem;
