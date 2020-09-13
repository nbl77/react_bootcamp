import React from 'react';
import {View, Text, Button, Animated} from 'react-native';
class LifeCycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message:"initial state"
    };
  }
  static getDerivedStateFromProps(props, state) {
    console.log("in state props LifeCycle");
    return {
       message: 'updated msg',
    }
  }
  componentDidMount() {
    this.setState({message:"update after mount"})
  }
  shouldComponentUpdate(){
    console.log("shouldComponentUpdate");
    return true
  }

  render(){
    console.log(this.state.message)
    return (
      <View>
        <Text>Halo</Text>
        <Button title="remove text" />
      </View>
    )
  }
}
export default LifeCycle;
