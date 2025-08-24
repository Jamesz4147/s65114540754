import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import styles from '../styles/Homestyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [heartrateData, setHeartrateData] = useState<any[]>([]);
  const [historyData, setHistoryData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/heartrate');
        setHeartrateData(response.data);
      } catch (err) {
        console.error("❌ Error fetching heartrate data:", err);
      }
    };
    fetchData();
  }, []);
  console.log(heartrateData);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/api/history');
        const formattedData = response.data.map((item: any) => ({
          ...item,
          hr: parseFloat(item.hr),
          spo2: parseFloat(item.spo2),
          timestamp: new Date(item.timestamp).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        }));
        setHistoryData(formattedData);
      } catch (err) {
        console.error("❌ Error fetching history data:", err);
      }
    };
    fetchHistory();
  }, []);

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Image source={require('../assets/e.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <View style={styles.iconCircle}>
            <Icon name="account-circle" size={60} color="#2D5DEC" style={styles.profileIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.head}>
        <Text style={styles.welcomeText}>สวัสดีตอนเช้า</Text>
        <Image source={require('../assets/S.png')} style={styles.sunIcon} />
      </View>

      <View style={styles.divider} />
      <Text style={styles.textheart}>อัตราการเต้นหัวใจ</Text>
      <View style={styles.divider1} />

      <View style={styles.card}>
        <View style={styles.heartRateContainer}>
          <Image source={require('../assets/HA.png')} style={styles.heartIcon} />
          <View>
            <Text style={styles.heartRateText}>
              heart rate: <Text style={styles.valueText}>
                {78}
              </Text> bpm ●
            </Text>
            <Text style={styles.oxygenText}>
              oxygen: <Text style={styles.valueText}>
                {95}
              </Text> ●
            </Text>
          </View>
        </View>
      </View>
    </>
  );

  const renderHistoryTable = () => (
    <View style={styles.historyTable}>
      {/* Header */}
      <View style={styles.historyHeader}>
        <Text style={styles.historyHeaderText}>วัน/เวลา</Text>
        <Text style={styles.historyHeaderText}>อัตราการเต้นของหัวใจ</Text>
        <Text style={styles.historyHeaderText}>ค่าออกซิเจน</Text>
      </View>

      {/* Rows */}
      {historyData.map((item, index) => (
        <View key={index} style={styles.historyRow}>
          <View style={styles.rowCell}>
            <Text style={styles.historyText}>{item.timestamp}</Text>
          </View>
          <View style={styles.rowCell}>
            <Text style={styles.historyText}>{item.hr} bpm</Text>
          </View>
          <View style={styles.rowCell}>
            <Text style={styles.historyText}>{item.spo2} SpO2</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderHeader()}
      {renderHistoryTable()}
    </ScrollView>
  );
};

export default HomeScreen;