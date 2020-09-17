import React from 'react';
import {Icon} from 'react-native-eva-icons';
import {Alert} from 'react-native';
import AuthContext from './../context/AuthContext';
const DeleteAction = ( props, itemObj, dataArr ) => {
  const {deleteData} = React.useContext(AuthContext);
  Alert.alert(
    'Warning!',
    'Are you sure ?',
      [
      {
        text: 'NO',
        onPress: () => false,
        style: 'cancel'
      },
      {
        text: 'YES',
        onPress: () => {
          deleteData( itemObj );
        }
      },
      ]
  );
}
const deleteBtn = ( props, item, data ) => (
  <Icon {...props} name="trash-2-outline" fill="#ec0101" onPress={_=>DeleteAction(props,item,data)} />
)
export default deleteBtn;
