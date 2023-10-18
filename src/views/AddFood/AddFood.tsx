import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import {Button, Image, Input} from '@rneui/themed';
import AddFoodModal from '../../components/AddFoodModal';
import {useState} from 'react';

const AddFood = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(!isOpen);
  };

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
          <Input placeholder="apples, pie, soda" />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Search"
            radius="lg"
            color="#ade8af"
            titleStyle={styles.searchButtonTitle}
          />
        </View>
      </View>
      <View>
        <AddFoodModal isOpen={isOpen} onClose={onClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
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
});

export default AddFood;
