import React, { useEffect } from 'react';
import { Button, Text, View, ImageBackground, Image } from 'react-native';
import { useAppStore } from '../../store/appStore';
import IMAGES from '../../constants/Images';
import tw from '../../utils.js/tw';
import StyledImage from '../common/StyledImage';
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const getPhoneNumber = (phone) => {
	const prefix = phone.includes('+91') ? '' : '+91';
	return `${prefix}${phone}`;
}

const Login: React.FC<{}> = () => {
	const [state, setState] = React.useState({
		phoneNumber: '',
		otp: '',
		confirm: null,
	});
	const { login, loading } = useAppStore();

	useEffect(() => {
		const subscribe = auth().onAuthStateChanged(onAuthChanged);
		return subscribe;
	});

	const onAuthChanged = (user) => {
		console.log(user);
	}

	const sendOtp = () => {
		if (!state.phoneNumber) {
			alert("Please enter phone number");
			return;
		}
		auth().signInWithPhoneNumber(getPhoneNumber(state.phoneNumber)).then((res) => {
			setState({ ...state, confirm: res });
		}).catch((err) => {
			console.log(err);
		})
	}

	const resendOtp = () => {
		 
		auth().signInWithPhoneNumber(getPhoneNumber(state.phoneNumber)).then((res) => {
			setState({ ...state, confirm: res });
		}).catch((err) => {
			console.log(err);
		})
	}

	const confirmOtp = () => {
		if (!state.confirm) return;
		if (!state.otp) { alert("Please enter otp"); return; };
		state.confirm.confirm(state.otp).then((userData) => {
			login(userData);
		}).catch((err) => {
			console.log(err);
		})
	}


	return (
		<View style={tw`w-full h-full center-h`}>
			{!state.confirm && <View style={tw`flex-1 flex-col p-6`}>
				<View style={tw`py-4`}>
					<TextInput placeholder='Enter Phone Number' label="Phone Number" value={state.phoneNumber} keyboardType='number-pad' onChangeText={(text) => {
						setState({ ...state, phoneNumber: text })
					}} />
				</View>
				<Button color={'green'} title="Send Otp" onPress={sendOtp} />
			</View>}
			{state.confirm && <View style={tw`flex-1 flex-col p-6`}>
				<View style={tw`py-4`}>
					<TextInput placeholder='Enter Otp' label="Otp" value={state.otp} keyboardType='number-pad' onChangeText={(text) => {
						setState({ ...state, otp: text })
					}} />
				</View>
				<View style={tw`my-2`}>
					<Button color={'red'} title="Resend" onPress={resendOtp} />
				</View>
				<View style={tw`my-2`}>
					<Button color={'green'} title="Verify" onPress={confirmOtp} />
				</View>
			</View>}
		</View>
	);
};



export default Login;
