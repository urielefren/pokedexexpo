import React from 'react';
import { StyleSheet, View } from 'react-native';
import PokeGrid from './common/pokegrid';

export default function App() {
  return (
    <View style={styles.container}>
      <h1 style={{ textAlign: 'center', backgroundColor: '#ce2029',
          padding: 20, fontSize: 20, fontStyle: 'bold', margin: 0}}>
        <img src={require('./assets/logo.png')} style={{height: 60}}/>
      </h1>
      <div style={{ paddingLeft: 16, paddingRight: 16, marginTop: 0}}>
        <PokeGrid></PokeGrid>
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
