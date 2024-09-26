import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserList from './components/UserList';
import UserPosts from './components/UserPosts';
 
const Stack = createStackNavigator();
 
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Users">
        <Stack.Screen name="Users" component={UserList} />
        <Stack.Screen name="UserPosts" component={UserPosts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;