import React, {FC} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../views/HomeScreen';
import DetailScreen from '../views/DetailScreen';
import ProductScreen from '../views/ProductScreen';
import ProfileScreen from '../views/ProfileScreen';
import WelcomeScreen from '../views/WelcomeScreen';
import LoginLogOutScreen from '../views/LoginLogOutScreen';

import {
  WELCOMESCREEN,
  HOMESCREEN,
  DETAILSCREEN,
  PROFILESCREEN,
  LOGINLOGOUTSCREEN,
  TABSHOP,
  TABDROPS,
  TABWISHLISH,
  SEARCHSCREEN,
  SHOWANDFILTERSCREEN,
} from './config';
import Icons, {TypeLibraryIcons} from '../components/Icons';
import HeaderHoc, {ChangeTitleHeader} from '../hocs/HeaderHoc';
import {navigationRef} from './navigationService';
import {colors, constants} from '../support/constants';
import SearchScreen from '../views/SearchScreen';
import ShowAndFilterScreen from '../views/ShowAndFilterScreen';

const Tab = createBottomTabNavigator();

export const InitTabBarNavigation = TABSHOP; //TABDROPS;

const HomeScreenTab: FC = () => {
  const _tabIcon =
    (name: string, lib: TypeLibraryIcons, size: number) =>
    ({color}: any) =>
      <Icons {...{name, lib, color, size}} />;

  return (
    <Tab.Navigator
      initialRouteName={InitTabBarNavigation}
      tabBarOptions={{
        showLabel: false,
        style: {
          height: constants.hFooter,
        },
        activeTintColor: colors.black,
        inactiveTintColor: colors.blueyGrey,
      }}>
      <Tab.Screen
        name={TABDROPS}
        component={HomeScreen}
        options={{
          tabBarIcon: _tabIcon('fire', 'MaterialCommunityIcons', 36),
        }}
        listeners={() => ({
          tabPress: ChangeTitleHeader(TABDROPS),
        })}
      />
      <Tab.Screen
        name={TABSHOP}
        component={ProductScreen}
        options={{
          tabBarIcon: _tabIcon('shopping-search', 'MaterialCommunityIcons', 32),
        }}
        listeners={() => ({
          tabPress: ChangeTitleHeader(TABSHOP),
        })}
      />
      <Tab.Screen
        name={TABWISHLISH}
        component={ProfileScreen}
        options={{
          tabBarIcon: _tabIcon('heart-outline', 'MaterialCommunityIcons', 32),
        }}
        listeners={() => ({
          tabPress: ChangeTitleHeader(TABWISHLISH),
        })}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          // initialRouteName="WELCOMESCREEN"
          initialRouteName="HOMESCREEN" // dev
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={WELCOMESCREEN} component={WelcomeScreen} />
          <Stack.Screen name={HOMESCREEN} component={HeaderHoc(HomeScreenTab)} />
          <Stack.Screen name={DETAILSCREEN} component={DetailScreen} />
          <Stack.Screen name={PROFILESCREEN} component={ProfileScreen} />
          <Stack.Screen name={LOGINLOGOUTSCREEN} component={LoginLogOutScreen} />
          <Stack.Screen name={SEARCHSCREEN} component={SearchScreen} />
          <Stack.Screen name={SHOWANDFILTERSCREEN} component={ShowAndFilterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
