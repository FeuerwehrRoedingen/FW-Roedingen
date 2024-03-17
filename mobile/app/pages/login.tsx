import React from "react";
import { View, Text } from "react-native";

import { LoginButton } from "../components/loginButton";

export default function Login() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Login</Text>
			<LoginButton />
		</View>
	);
}