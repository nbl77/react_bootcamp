import * as React from 'react';
import {
	Text,
	ScrollView,
	ImageBackground,
	View,
	TextInput,
	StyleSheet,
	Button
} from 'react-native';

function App() {
	const image = {
		uri: "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
	};
	return (
		<ImageBackground source={image} style={style.container}>
      <View style={style.section}>
        <View style={{width: "100%",alignItems: 'center'}}>
          <Text style={{fontSize: 30,fontWeight: 'bold',marginVertical: 20}}>Login</Text>
        </View>
        <View style={style.formGroup}>
          <Text style={style.label}>Username</Text>
          <TextInput style={style.formControl} placeholder="Masukan Username" />
        </View>
        <View style={style.formGroup}>
          <Text style={style.label}>Password</Text>
          <TextInput secureTextEntry={true} style={style.formControl} textContentType="password" placeholder="Masukan Password" />
        </View>
        <View accessibilityRole="button" style={style.formGroup}>
          <Button title="Login" color="#3498db" />
          <Text style={{marginTop: 20}}>Forget Password? <Text style={{color: "#3498db"}}>Reset Password</Text></Text>
        </View>
      </View>
    </ImageBackground>
	)
}
const style = StyleSheet.create( {
	container: {
		backgroundColor: "#fff",
		flex: 1,
		justifyContent: 'flex-end'
	},
	section: {
		backgroundColor: "#fff",
		borderRadius: 15,
		paddingHorizontal: 20,
		marginBottom: 50,
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.15,
		shadowRadius: 10,
		elevation: 3,
		marginHorizontal: 20
	},
	formControl: {
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#aaa"
	},
	formGroup: {
		marginBottom: 20
	}
} )
export default App;
