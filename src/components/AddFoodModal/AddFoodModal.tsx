import {FC} from 'react';
import {Modal, View, StyleSheet, Image} from 'react-native';
import {AddFoodModalProps} from '../../types';
import {Button} from '@rneui/themed';
import FormAddFood from '../FormAddFood';

const AddFoodModal: FC<AddFoodModalProps> = ({onClose, isOpen}) => {
  return (
    <Modal
      visible={isOpen}
      onRequestClose={() => onClose()}
      transparent
      animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.buttonCloseContainer}>
            <Button onPress={() => onClose()} type="clear">
              <Image
                source={require('../../assets/icons/close.png')}
                style={styles.iconClose}
              />
            </Button>
          </View>
          <FormAddFood isOpen={isOpen} onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  buttonCloseContainer: {
    alignItems: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
    width: '70%',
    padding: 18,
    borderRadius: 20,
    // ios
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    //android
    elevation: 5,
  },
  iconClose: {
    width: 15,
    height: 15,
  },
});

export default AddFoodModal;
