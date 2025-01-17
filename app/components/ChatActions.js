import PropTypes from 'prop-types'
import React from 'react'
import Switch from 'react-native'
import { Bubble, MessageText, InputToolbar } from 'react-native-gifted-chat'
import DocumentPicker from 'react-native-document-picker';
//import * as ImagePicker from 'expo-image-picker';


import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native'

export default class CustomActions extends React.Component {
  onActionsPress = () => {
    let options = [
      'Choose photo from library',
      'Take a picture',
      'Cancel',
    ]

    options = [
      'Upload file...',
      'Cancel',
    ]
    const cancelButtonIndex = options.length - 1
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async buttonIndex => {
        const { onSend } = this.props
        switch (buttonIndex) {
          case 0:
            this.onAttachFile();
            return
          case 1:
            takePictureAsync(onSend)
            return
          default:
        }
      },
    )
  }

    onAttachFile = async () => { try { const results = await DocumentPicker.pick({ type: [DocumentPicker.types.allFiles], });

       console.log(results);
       let res = results[0];
       let type = res.name.slice(res.name.lastIndexOf('.') + 1);
           this.props.onSendWithFile(res);
           /*
           if (
                 res.type == 'application/pdf' ||
                 res.type == 'image/jpeg' ||
                 res.type == 'image/png' ||
                 res.type == 'image/jpg'
           ) {
           } else {
                 alert(`${type} is not allowed. Only images types are supported.`);
           }
           */
     } catch (err) {
       //Handling any exception (If any)
       if (DocumentPicker.isCancel(err)) {
         //If user canceled the document selection
         // alert('Canceled from single doc picker');
       } else {
         //For Unknown Error
         // alert('Unknown Error: ' + JSON.stringify(err));
         throw err;
       }
     }
    };

  renderIcon = () => {
    if (this.props.renderIcon) {
      return this.props.renderIcon()
    }
    return (
      <View style={[styles.wrapper, this.props.wrapperStyle]}>
        <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
      </View>
    )
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.onActionsPress}
      >
        {this.renderIcon()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
})

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
}

CustomActions.defaultProps = {
  onSend: () => {},
  options: {},
  renderIcon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
}

CustomActions.propTypes = {
  onSend: PropTypes.func,
  onSendWithFile: PropTypes.func,
  options: PropTypes.object,
  renderIcon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
}
