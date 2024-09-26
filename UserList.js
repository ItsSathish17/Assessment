import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchUsers } from '../api/api';
import Loading from './Loading';
 
const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
 
    loadUsers();
  }, []);
 
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('UserPosts', { userId: item.id, userName: item.name })}>
      <View style={styles.userItem}>
        <Text>{item.name}</Text>
        <Text>{item.email}</Text>
        <Text>{item.phone}</Text>
        <Text>{item.website}</Text>
      </View>
    </TouchableOpacity>
  );
  if (loading) return <Loading />;
  if (error) return <Text style={styles.error}>{error}</Text>;

 
  return (
    <FlatList
      data={users}
      renderItem={renderItem}
keyExtractor={(item) => item.id.toString()}
      initialNumToRender={5}
      onEndReachedThreshold={0.5}
    />
  );
};
 
const styles = StyleSheet.create({
  userItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
 
export default UserList;