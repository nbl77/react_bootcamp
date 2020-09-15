import React from 'react';
import {Icon} from 'react-native-eva-icons';
import {Alert} from 'react-native';
import AuthContext from './../context/AuthContext';
const DeleteAction = ( props, itemObj, dataArr ) => {
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
          const newData = dataArr.filter( item => {
            if ( item.id === itemObj.id ) {
              alert( "Success Delete data" )
              return false;
            }
            return true
          } )
          deleteData( newData );
        }
      },
      ]
  );
}
const deleteBtn = ( props, item, data ) => (
  <Icon {...props} name="trash-2-outline" fill="#ec0101" onPress={_=>DeleteAction(props,item,data)} />
)
export default deleteBtn;
