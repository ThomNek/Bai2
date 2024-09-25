// src/UserListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { usersCollection } from './firebaseConfig';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = usersCollection.onSnapshot(snapshot => {
      const userList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - {item.email} - Tuổi: {item.age}</Text>
            <Button title="Cập Nhật" onPress={() => navigation.navigate('UpdateUser', { user: item })} />
            <Button title="Xóa" onPress={() => handleDeleteUser(item.id)} />
          </View>
        )}
      />
      <Button title="Thêm Người Dùng" onPress={() => navigation.navigate('AddUser')} />
    </View>
  );
};

const handleDeleteUser = async (id) => {
  try {
    await usersCollection.doc(id).delete();
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { marginBottom: 10, padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
});

export default UserListScreen;
