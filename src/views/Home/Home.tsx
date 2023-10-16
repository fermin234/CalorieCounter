import {Text, View, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';

const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <SubHeader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
  },
});

export default Home;
