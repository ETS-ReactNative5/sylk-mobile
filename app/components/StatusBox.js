import React, { useState }  from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StatusBox = (props) => {

    const [visible, setVisible] = useState(true);

    let iconName;
    switch (props.level) {
        case 'info':
            iconName = 'information-outline';
            break;
        case 'danger':
            iconName = 'alert-circle-outline';
            break;
        case 'warning':
            iconName = 'alert-octogon-outline';
            break;
    }

    return (
        <Snackbar visible={visible} duration={2000} onDismiss={() => { setVisible(false) }}>
            { iconName ? (<Icon name={iconName} />) : null }{ props.title }{ props.message }
        </Snackbar>
    );
};

StatusBox.propTypes = {
    level: PropTypes.string,
    message: PropTypes.string.isRequired,
    title: PropTypes.string,
};


export default StatusBox;
