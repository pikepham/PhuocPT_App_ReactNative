import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import Home from './HomeComponent';
const HomeNavigator = createStackNavigator();
function HomeNavigatorScreen() {
  return (
    <HomeNavigator.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#512DA8' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <HomeNavigator.Screen name='Home' component={Home} 
      options={({ navigation }) => ({
        headerTitle: 'Home',
        headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
    })} />
    </HomeNavigator.Navigator>
  );
}

import About from './AboutComponent';
const AboutNavigator = createStackNavigator();
function AboutNavigatorScreen() {
  return (
    <AboutNavigator.Navigator initialRouteName='About'
      screenOptions={{
        headerStyle: { backgroundColor: '#512DA8' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <AboutNavigator.Screen name='About' component={About}
      options={({ navigation }) => ({
        headerTitle: 'About',
        headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
      })}  
      />
    </AboutNavigator.Navigator>
  );
}

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
const MenuNavigator = createStackNavigator();
function MenuNavigatorScreen() {
  return (
    <MenuNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={{
        headerStyle: { backgroundColor: '#512DA8' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <MenuNavigator.Screen name='Menu' component={Menu}  options={({ navigation }) => ({
          headerTitle: 'Menu',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <MenuNavigator.Screen name='Dishdetail' component={Dishdetail} options={{ headerTitle: 'Dish Detail' }} />
    </MenuNavigator.Navigator>
  );
}

import Contact from './ContactComponent';
const ContactNavigator = createStackNavigator();
function ContactNavigatorScreen() {
  return (
    <ContactNavigator.Navigator initialRouteName='Contact'
      screenOptions={{
        headerStyle: { backgroundColor: '#512DA8' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <ContactNavigator.Screen name='Contact' component={Contact} options={({ navigation }) => ({
          headerTitle: 'Contact',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </ContactNavigator.Navigator>
  );
}

const MainNavigator = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: '#7cc', height: 80, alignItems: 'center', flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Image source={require('./images/logo.png')} style={{ margin: 10, width: 80, height: 60 }} />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>TDK & Friends</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem label='Help'
          icon={({ focused, color, size }) => <Icon name='help' size={size} color={focused ? '#7cc' : '#ccc'} />}
          onPress={() => Linking.openURL('https://reactnavigation.org/docs/getting-started')} />
      </DrawerContentScrollView>
    );
  }

function MainNavigatorScreen() {
  return (
    <MainNavigator.Navigator initialRouteName='Home'drawerContent={props => <CustomDrawerContent {...props} />}>
      <MainNavigator.Screen name='Home' component={HomeNavigatorScreen} options={{ headerShown: false, drawerIcon: ({ focused, size }) => (<Icon name='home' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='About' component={AboutNavigatorScreen} options={{ headerShown: false, title: 'About Us' ,  drawerIcon: ({ focused, size }) => (<Icon name='info' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='Menu' component={MenuNavigatorScreen} options={{ headerShown: false ,drawerIcon: ({ focused, size }) => (<Icon name='menu' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='Contact' component={ContactNavigatorScreen} options={{ headerShown: false, title: 'Contact Us' , drawerIcon: ({ focused, size }) => (<Icon name='contacts' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
    </MainNavigator.Navigator>
  );
}

// redux
import { connect } from 'react-redux';
import { fetchLeaders, fetchDishes, fetchComments } from '../redux/ActionCreators';
const mapDispatchToProps = dispatch => ({
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments())
});

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
  componentDidMount() {
    // redux
    this.props.fetchLeaders();
    this.props.fetchDishes();
    this.props.fetchComments();
  }
}
export default connect(null, mapDispatchToProps)(Main);