import * as React from 'react';
import {
	StyleSheet,
	Image,
  View,
	TouchableWithoutFeedback
} from 'react-native';
import {
	Layout,
	Text,
	Input,
	Button,
	CheckBox
} from '@ui-kitten/components';
import {
	Icon
} from 'react-native-eva-icons';
import style from './../Assets/style';
import AuthContext from './../context/AuthContext';

function Signup({navigation}) {
	const [ email, setEmail ] = React.useState( "" );
	const [ password, setPassword ] = React.useState( "" );
	const [ name, setName ] = React.useState( "" );
	const [ profile, setProfile ] = React.useState( "" );
	const [ device, setDevice ] = React.useState( "" );
	const [ rePassword, setRePassword ] = React.useState( "" );
	const [ secureTextEntry, setSecureTextEntry ] = React.useState( true );
	const [ focusInp, setFocusInp ] = React.useState( false );
	const [ activeChecked, setActiveChecked ] = React.useState( false );
	const toggleSecureEntry = () => {
		setSecureTextEntry( !secureTextEntry );
	};
  const {signUp} = React.useContext(AuthContext);
	const renderIcon = ( props ) => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off":"eye"} fill="#333"/>
    </TouchableWithoutFeedback>
	);
	const iconInput = props => {
		if ( email === "" ) {
			return <></>
    }
    return <Icon {...props} name="checkmark-outline" fill="#28df99" />
		}
		const changeFocus = type => {
			if ( type !== focusInp ) {
				setFocusInp( type )
			} else {
				setFocusInp( "" );
			}
		}
		const handleSubmit = props => {
      const data = {
        name,
				email,
				profile,
				password,
				device
      }
			if (password !== rePassword) {
				alert("Password tidak sama");
			}else {
				setName("");
				setEmail("");
				setProfile("");
				setPassword("");
				setDevice("");
				signUp(data);
			}
		}
		return (
			<Layout style={style.container}>
        <Text style={style.bold} category='h4'>Sign Up</Text>
          <Layout style={{marginTop:50}}>
            <Input
                placeholder='Insert Name'
                value={name}
                style={style.formInput}
                onChangeText={nextValue => setName(nextValue)}
              />
							<Input
	                placeholder='Insert Email'
	                value={email}
	                style={focusInp === "email" ? style.focus : style.formInput}
	                accessoryRight={iconInput}
	                onFocus={_=>changeFocus("email")}
	                onBlur={_=>changeFocus("email")}
	                onChangeText={nextValue => setEmail(nextValue)}
	              />
								<Input
		                placeholder='Insert Profile'
		                value={profile}
		                style={style.formInput}
		                onChangeText={nextValue => setProfile(nextValue)}
		              />
									<Input
			                placeholder='Insert Device'
			                value={device}
			                style={style.formInput}
			                onChangeText={nextValue => setDevice(nextValue)}
			              />
              <Input
                value={password}
                placeholder='Insert Password'
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                style={focusInp === "password" ? style.focus : style.formInput}
                onFocus={_=>changeFocus("password")}
                onBlur={_=>changeFocus("password")}
                onChangeText={nextValue => setPassword(nextValue)}
              />
							<Input
								value={rePassword}
								placeholder='Confirm Password'
								accessoryRight={renderIcon}
								secureTextEntry={secureTextEntry}
								style={focusInp === "rePassword" ? style.focus : style.formInput}
								onFocus={_=>changeFocus("rePassword")}
								onBlur={_=>changeFocus("rePassword")}
								onChangeText={nextValue => setRePassword(nextValue)}
							/>
              <Button size="small" style={{backgroundColor: "#ff8e6e",borderColor: "#ff8e6e"}} onPress={handleSubmit}>Sign Up</Button>
              <View>
    						<Text>Sudah punya akun?</Text>
    						<Text style={{color: "#3498db",fontSize: 18}} onPress={()=>navigation.navigate("login")}>Sign In</Text>
    					</View>
          </Layout>
        </Layout>
		);
	};
	export default Signup;
