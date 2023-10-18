import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/themed';
import {StyleSheet, View, Text, Image} from 'react-native';
import {RootStackParams} from '../../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const SubHeader = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParams, 'Home'>>();

  const handleAddCaloriesPress = () => {
    navigate('AddFood');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.caloriesLegend}>Calories</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button radius="lg" color="#4ecb71" onPress={handleAddCaloriesPress}>
          <Image
            tintColor="white"
            source={require('../../assets/icons/add.png')}
            style={styles.iconAdd}
          />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  caloriesLegend: {
    fontSize: 20,
  },
  iconAdd: {
    width: 30,
    height: 30,
  },
});

export default SubHeader;
