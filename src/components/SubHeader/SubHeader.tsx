import {Button, Icon} from '@rneui/themed';
import {StyleSheet, View, Text} from 'react-native';

const SubHeader = () => {
  return (
    <View>
      <Text>SubHeader</Text>
      <View style={styles.leftContainer}>
        <Text></Text>
      </View>
      <View style={styles.rightContainer}>
        <Button icon={<Icon name="add-circle-outline" />} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftContainer: {},
  rightContainer: {},
});

export default SubHeader;
