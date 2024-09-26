import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchUserPosts } from '../api/api';
import Loading from './Loading';
 
const UserPosts = ({ route }) => {
  const { userId, userName } = route.params;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchUserPosts(userId);
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
 
    loadPosts();
  }, [userId]);
 
  const renderItem = ({ item }) => (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );
 
  if (loading) return <Loading />;
  if (error) return <Text style={styles.error}>{error}</Text>;
 
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{userName}'s Posts</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
keyExtractor={(item) => item.id.toString()}
        initialNumToRender={5}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
 
export default UserPosts;