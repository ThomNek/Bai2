// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserListScreen from './screens/UserListScreen';
import AddUserScreen from './screens/AddUserScreen';
import UpdateUserScreen from './screens/UpdateUserScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Danh sách Người Dùng' }} />
        <Stack.Screen name="AddUser" component={AddUserScreen} options={{ title: 'Thêm Người Dùng' }} />
        <Stack.Screen name="UpdateUser" component={UpdateUserScreen} options={{ title: 'Cập Nhật Người Dùng' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
``
