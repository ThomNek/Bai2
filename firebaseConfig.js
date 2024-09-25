// src/firebaseConfig.js
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');
