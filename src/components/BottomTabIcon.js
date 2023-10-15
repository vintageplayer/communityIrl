import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';


export const BottomTabIcon = ({title, focused}) => {
	const iconName = `${focused ? '' : 'in'}active${title}Icon`;
	// TODO: Add images using react-native vector libraries
	const imgSrc = undefined;
	return (
		<View style={styles.tabButton}>
			<Text>{title}</Text>
		</View>
	)
};


const styles = StyleSheet.create({
	tabButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabTitle: active => ({
		marginTop: '5%',
		color: active ? 'black' : 'grey',
	}),
});