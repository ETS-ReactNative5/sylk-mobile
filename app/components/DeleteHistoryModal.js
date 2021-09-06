import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import { View } from 'react-native';
import UserIcon from './UserIcon';
import { Chip, Dialog, Portal, Text, Button, Surface, TextInput, Paragraph, RadioButton, Checkbox } from 'react-native-paper';
import KeyboardAwareDialog from './KeyBoardAwareDialog';

const DialogType = Platform.OS === 'ios' ? KeyboardAwareDialog : Dialog;

import styles from '../assets/styles/blink/_DeleteHistoryModal.scss';


class DeleteHistoryModal extends Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            displayName: this.props.displayName,
            show: this.props.show,
            uri: this.props.uri,
            period: "0",
            remoteDelete: false,
            confirm: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({show: nextProps.show,
                       displayName: nextProps.displayName,
                       uri: nextProps.uri,
                       confirm: nextProps.confirm
                       });
    }

    deleteMessages(event) {
        event.preventDefault();
        if (this.state.confirm) {
            this.setState({confirm: false});
            this.props.deleteMessages(this.state.uri, true, this.state.period, this.state.remoteDelete);
            this.props.close();
        } else {
            this.setState({confirm: true});
        }
    }

    setPeriod(value) {
        this.setState({period: value});
    }

    toggleRemoteDelete() {
        this.setState({remoteDelete: !this.state.remoteDelete})
    }

    render() {

        let identity = {uri: this.state.uri, displayName: this.state.displayName};
        let canDeleteRemote = this.state.uri && this.state.uri.indexOf('@videoconference') === -1;
        canDeleteRemote = false;
        let canDeleteByTime = false;

        let deleteLabel = this.state.confirm ? 'Confirm': 'Delete';

        return (
            <Portal>
                <DialogType visible={this.state.show} onDismiss={this.props.close}>
                    <Surface style={styles.container}>
                        <View style={styles.titleContainer}>
                            <View style={styles.titleContainer}>
                            { this.state.uri ?
                                <UserIcon style={styles.avatar} identity={identity}/>
                            : null}
                            </View>

                            <View style={styles.titleContainer}>
                               <Dialog.Title style={styles.title}>Delete messages</Dialog.Title>
                           </View>

                        </View>
                            { this.state.uri ?
                        <View>
                             <Text style={styles.body}>
                                 Confirm deletion of all messages with {this.state.uri}.
                             </Text>
                             <Text style={styles.body}>
                                 The messages will not be removed from remote party.
                             </Text>
                        </View>
                             :
                             <Text style={styles.body}>
                               Please confirm the deletion of all messages. This cannot be undone.
                             </Text>
                            }

                         { canDeleteByTime ?

                        <View style={styles.checkBoxGroupRow}>
                            <RadioButton.Group onValueChange={newValue => this.setPeriod(newValue)} value={this.state.period}>
                              <View style={styles.checkButton}>
                                <Text>Last hour</Text>
                                <RadioButton value="1" />
                              </View>
                              <View style={styles.checkButton}>
                                <Text>Last day</Text>
                                <RadioButton value="24" />
                              </View>
                              <View style={styles.checkButton}>
                                <Text>   All</Text>
                                <RadioButton value="0" />
                              </View>
                            </RadioButton.Group>
                        </View>
                        : null}

                        {canDeleteRemote ?
                            <View style={styles.checkBoxRow}>
                              <Text>Delete from recipient too</Text>
                                <Checkbox
                                  status={this.state.remoteDelete ? 'checked' : 'unchecked'}
                                  onPress={() => {this.toggleRemoteDelete()}}
                                  />
                                </View>
                        : null}

                        <View style={styles.buttonRow}>

                        <Button
                            mode="contained"
                            style={styles.button}
                            onPress={this.deleteMessages}
                            icon="delete"
                            accessibilityLabel="Delete messages"
                            > {deleteLabel}
                        </Button>
                        </View>
                    </Surface>
                </DialogType>
            </Portal>
        );
    }
}


DeleteHistoryModal.propTypes = {
    show               : PropTypes.bool.isRequired,
    close              : PropTypes.func.isRequired,
    uri                : PropTypes.string,
    displayName        : PropTypes.string,
    deleteMessages     : PropTypes.func
};

export default DeleteHistoryModal;
