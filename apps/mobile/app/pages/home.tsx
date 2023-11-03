import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNotifications } from '../notifications';

export default function Home() {

	const {expoPushToken, notification} = useNotifications();

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
    </View>
	);
}
