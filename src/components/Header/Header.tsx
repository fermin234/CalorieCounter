import {Text, View, Image, StyleSheet} from 'react-native';

const staticInfo = {
  name: 'Fermin Solaberrieta',
  uri: 'https://avatars.githubusercontent.com/u/10101138?v=4',
};

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{`Hello ${staticInfo.name}`}</Text>
        <Text style={styles.subtitle}>Welcom back to your goal</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={{uri: staticInfo.uri}} style={styles.profileImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: '#808080',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 5000,
  },
});

export default Header;
