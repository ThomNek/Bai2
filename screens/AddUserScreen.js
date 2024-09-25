// src/AddUserScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { usersCollection } from './firebaseConfig';

const AddUserScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddUser = async () => {
    if (!name || !email || !age) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    setLoading(true);
    try {
      await usersCollection.add({
        name,
        email,
        age: parseInt(age),
      });
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      setErrorMessage('Lỗi khi thêm người dùng. Vui lòng thử lại.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Tên" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Tuổi" value={age} onChangeText={setAge} keyboardType="numeric" />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <Button title="Thêm Người Dùng" onPress={handleAddUser} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { borderWidth: 1, marginBottom: 12, padding: 8 },
  error: { color: 'red', marginBottom: 10 }
});

export default AddUserScreen;
