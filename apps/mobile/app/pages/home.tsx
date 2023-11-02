import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Home() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Home</Text>
			<Button title="Go to About" onPress={() => {}} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	text: {
		fontSize: 30,
	},
});
