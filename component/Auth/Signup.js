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
	const [ username, setUsername ] = React.useState( "" );
	const [ password, setPassword ] = React.useState( "" );
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
		if ( username === "" ) {
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
        email:username,
        password:password
      }
      if (data.email && data.password) {
        signUp(data);
        setUsername("");
        setPassword("");
      }
		}
		return (
			<Layout style={style.container}>
        <Text style={style.bold} category='h4'>Sign Up</Text>
          <Layout style={{marginTop:50}}>
            <Input
                placeholder='Insert Email'
                value={username}
                style={focusInp === "username" ? style.focus : style.formInput}
                accessoryRight={iconInput}
                onFocus={_=>changeFocus("username")}
                onBlur={_=>changeFocus("username")}
                onChangeText={nextValue => setUsername(nextValue)}
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
              <Button size="small" style={{backgroundColor: "#ff8e6e",borderColor: "#ff8e6e"}} onPress={handleSubmit}>Sign Up</Button>
              <View>
    						<Text>Sudah punya akun?</Text>
    						<Text style={{color: "#3498db",fontSize: 18}} onPress={()=>navigation.navigate("login")}>Sign Up</Text>
    					</View>
          </Layout>
        </Layout>
		);
	};
	export default Signup;
