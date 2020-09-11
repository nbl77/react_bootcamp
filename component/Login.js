import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Layout, Text, Input, Button, CheckBox} from '@ui-kitten/components';
import { Icon } from 'react-native-eva-icons';
import style from './style';

function Login({navigation}) {
  const [value, setValue] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [focusInp,setFocusInp] = React.useState(false);
  const [activeChecked,setActiveChecked] = React.useState(false);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off":"eye"} fill="#333"/>
    </TouchableWithoutFeedback>
  );
  const iconInput = props =>{
    if (username === "") {
      return <></>
    }
    return <Icon {...props} name="checkmark-outline" fill="#28df99" />
  }
  const changeFocus = type =>{
    if (type !== focusInp) {
      setFocusInp(type)
    }else {
      setFocusInp("");
    }
  }
  return (
    <Layout style={style.container}>
    <Text style={style.bold} category='h4'>Sign In</Text>
      <Layout style={{marginTop: 20}}>
        <Input
            placeholder='Insert Username'
            value={username}
            style={focusInp === "username" ? style.focus : style.formInput}
            accessoryRight={iconInput}
            onFocus={_=>changeFocus("username")}
            onBlur={_=>changeFocus("username")}
            onChangeText={nextValue => setUsername(nextValue)}
          />
          <Input
            value={value}
            placeholder='Insert Password'
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            style={focusInp === "password" ? style.focus : style.formInput}
            onFocus={_=>changeFocus("password")}
            onBlur={_=>changeFocus("password")}
            onChangeText={nextValue => setValue(nextValue)}
          />
          <CheckBox
            checked={activeChecked}
            style={{marginBottom: 20}}
            status="warning"
            onChange={nextChecked => setActiveChecked(nextChecked)}>
            Remember me
          </CheckBox>
          <Button size="small" style={{backgroundColor: "#ff8e6e",borderColor: "#ff8e6e"}} onPress={_=>navigation.navigate('home')}>Login</Button>
      </Layout>
    </Layout>
  );
};
export default Login;
