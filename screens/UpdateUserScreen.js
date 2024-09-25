// src/UpdateUserScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { usersCollection } from './firebaseConfig';

const UpdateUserScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age.toString());
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdateUser = async () => {
    if (!name || !email || !age) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    setLoading(true);
    try {
      await usersCollection.doc(user.id).update({
        name,
        email,
        age: parseInt(age),
      });
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      setErrorMessage('Lỗi khi cập nhật người dùng.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Tên" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Tuổi" value={age} onChangeText={setAge} keyboardType="numeric" />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <Button title="Cập Nhật Người Dùng" onPress={handleUpdateUser} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { borderWidth: 1, marginBottom: 12, padding: 8 },
  error: { color: 'red', marginBottom: 10 }
});

export default UpdateUserScreen;
