import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/UserDetailScreenStyles';
import { useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

type RootStackParamList = {
  UserDetail: { user: any };
}

const UserDetailScreen = () => {
    const route = useRoute<UserDetailRouteProp>();
  const { user } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}> 
            <Icon name="arrow-back" size={24} color="#2D5DEC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>รายชื่อบัญชี</Text>
        <Image source={require('../assets/e.png')} style={styles.logo} />
      </View>

      {/* รายละเอียด */}
      <Text style={styles.sectionTitle}>รายชื่อ</Text>

      <Image source={require('../assets/user-icon.png')} style={styles.avatar} />

      <Text style={styles.name}>ชื่อ: {user.name}</Text>
      <Text style={styles.phone}>เบอร์โทรติดต่อ: {user.phone || 'ไม่ระบุ'}</Text>
      <Text style={styles.email}>อีเมล: {user.email}</Text>
    </View>
  );
};

export default UserDetailScreen;
