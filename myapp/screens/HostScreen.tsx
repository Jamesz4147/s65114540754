import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, FlatList, Alert, Image, TouchableOpacity
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // ✅ เพิ่ม
import styles from '../styles/HostScreenstyles';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RootStackParamList = {
  HostScreen: undefined;
  UserDetail: { user: any };
};

type HostScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HostScreen'>;



const HostScreen = () => {
  const [hostId, setHostId] = useState<number | null>(null);
  const [role, setRole] = useState<'owner' | 'member' | null>(null);
  const [hostName, setHostName] = useState('');
  const [members, setMembers] = useState<any[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [ownerId, setOwnerId] = useState<number | null>(null);
  const navigation = useNavigation<HostScreenNavigationProp>();
  useEffect(() => {
    const initHost = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;
      try {
        const res = await axios.get(`/api/init-or-create-host/${userId}`);
        setHostId(res.data.host_id);
        setRole(res.data.role);
        setHostName(res.data.host_name);
        setOwnerId(res.data.owner_id);
        fetchMembers(res.data.host_id);
      } catch (err) {
        console.error(err);
      }
    };
    initHost();
  }, []);

  const fetchMembers = async (id: number) => {
    const res = await axios.get(`/api/host-members/${id}`);
    setMembers(res.data.members);
  };

  const addMember = async () => {
    try {
      const res = await axios.post('/api/add-host-members', {
        host_id: hostId,
        member_emails: [emailInput],
      });

      if (res.data.added.length > 0) {
        Alert.alert('✅ เพิ่มสมาชิกสำเร็จ');
        fetchMembers(hostId!);
        setEmailInput('');
      } else {
        Alert.alert('❌ ไม่พบอีเมลในระบบ');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('เกิดข้อผิดพลาด');
    }
  };

  const renderMember = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('UserDetail', { user: item })}
      >
        <View style={styles.memberCard}>
          <Image source={require('../assets/user-icon.png')} style={styles.memberIcon} />
          <Text style={styles.memberName}>{item.name}</Text>
          <Text style={styles.memberSubtext}>
            {item.id === ownerId ? 'เจ้าของ Host' : 'สมาชิก'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
      <TouchableOpacity onPress={() => navigation.goBack()}> 
            <Icon name="arrow-back" size={24} color="#2D5DEC" />
        </TouchableOpacity>
        <Text style={styles.headerText}>รายชื่อบัญชี</Text>
        <Image source={require('../assets/e.png')} style={styles.logo} />
    </View>
      <Text style={styles.hostName}>Host: {hostName}</Text>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMember}
        numColumns={2}
        contentContainerStyle={styles.memberList}
      />

      {role === 'owner' && (
        <View style={styles.addForm}>
          <TextInput
            value={emailInput}
            onChangeText={setEmailInput}
            placeholder="กรอกอีเมลเพื่อเพิ่มสมาชิก"
            style={styles.input}
          />
          <Button title="เพิ่มสมาชิก" onPress={addMember} />
        </View>
      )}
    </View>
  );
};

export default HostScreen;
