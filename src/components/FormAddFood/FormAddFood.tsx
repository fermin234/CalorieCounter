import {Button, Input} from '@rneui/themed';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useState, FC, useEffect} from 'react';
import {AddFoodModalProps} from '../../types';
import useFoodStorage from '../../hooks/useFoodStorage';

const FormAddFood: FC<AddFoodModalProps> = ({isOpen, onClose}) => {
  const {onSaveFood} = useFoodStorage();
  const [calories, setCalories] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [portion, setPortion] = useState<string>('');

  const handleSubmit = async () => {
    try {
      await onSaveFood({calories, name, portion});

      onClose(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setCalories('');
    setName('');
    setPortion('');
  }, [isOpen]);

  return (
    <View>
      <View style={styles.fromItem}>
        <View style={styles.inputContainer}>
          <Input value={name} onChangeText={(text: string) => setName(text)} />
        </View>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Name</Text>
        </View>
      </View>
      <View style={styles.fromItem}>
        <View style={styles.inputContainer}>
          <Input
            value={calories}
            onChangeText={(text: string) => setCalories(text)}
          />
        </View>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>CAL</Text>
        </View>
      </View>
      <View style={styles.fromItem}>
        <View style={styles.inputContainer}>
          <Input
            value={portion}
            onChangeText={(text: string) => setPortion(text)}
          />
        </View>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Portion gr.</Text>
        </View>
      </View>
      <View style={styles.buttonAddContainer}>
        <Button
          radius="lg"
          color="#4ecb71"
          disabled={!calories.trim() || !name.trim() || !portion.trim()}
          onPress={handleSubmit}>
          <Image
            tintColor="white"
            source={require('../../assets/icons/add.png')}
            style={styles.iconAdd}
          />
          Add
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fromItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 2,
  },
  legendContainer: {
    flex: 1,
  },
  legend: {
    fontWeight: '500',
  },
  buttonAddContainer: {
    alignItems: 'flex-end',
  },
  iconAdd: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default FormAddFood;
