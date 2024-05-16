import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Platform,Image, StatusBar } from 'react-native';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import Empty from '../assets/ghost.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {  Button,Dialog, Portal } from 'react-native-paper';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const Home = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      hideDialog()
      navigation.replace('Login');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor='#e6e6fa' barStyle='dark-content'></StatusBar>
        <LinearGradient colors={['#e6e6fa', '#e6e6fa']} style={styles.header}>
        <Text style={styles.headerText}>Home page</Text>
      </LinearGradient>
      <AnimatedLottieView
            source={Empty}
            autoPlay
            loop
            style={styles.emptyAnimation}
          />
          <Text style={{fontSize:25,fontFamily:'RobotoSlab-Black',color:'black'}}>
            Nothing to show here
          </Text>

<TouchableOpacity style={styles.signOutButton} onPress={showDialog}><Text><FontAwesomeIcon size={25} color='#4169e1' icon={faSignOut} /></Text></TouchableOpacity>

<Portal>
  <Dialog visible={visible} onDismiss={hideDialog}>
    <Dialog.Title>Alert</Dialog.Title>
    <Dialog.Content>
      <Text style={{ color: 'black', fontSize: 17 }}>Are you sure you want to logout?</Text>
    </Dialog.Content>
    <Dialog.Actions>
      <TouchableOpacity onPress={hideDialog} style={styles.button}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut} style={[styles.button, styles.buttonDanger]}>
        <Text style={[styles.buttonText,{color:'#4169e1'}]}>Yes</Text>
      </TouchableOpacity>
    </Dialog.Actions>
  </Dialog>
</Portal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f8f4ff',
    justifyContent:'center',
    alignItems:'center'
  },
  header: {
    padding: 16,
    position:'absolute',
    top:0,
    width:'100%'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: '#4169e1',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingAnimation: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  loadingText: {
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyAnimation: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  emptyText: {
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
  },
  itemContainer: {
    width: '90%',
    padding: 15,
    paddingHorizontal:25,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: '#4169e1',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
    marginBottom: 5,
  },
  itemText: {
    fontSize: 15,
    color: 'white',
    padding:5
  },
  signOutButton: {
    alignItems: 'center',
    backgroundColor: '#e6e6fa',
    margin: 25,
    borderRadius: 10,
    padding: 10,
    marginVertical:10,
    width:50,
    position:'absolute',
    right:10,
    bottom:10,
  },
  signOutText: {
    fontSize: 18,
    color: '#4169e1',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4169e1',
    backgroundColor:'#4169e1',
   
  },
  buttonText: {
    fontSize: 15,
    color:'white'
  },
  buttonDanger: {
    backgroundColor: '#e6e6fa', 
    borderColor: '#4169e1',
    color:'#4169e1'
  },
});

export default Home;
