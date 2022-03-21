import React, {useRef, useEffect} from 'react';
import {View} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

const ToastMessage = ({type, message}) => {
    let dropDownAlertRef = useRef();
    useEffect(() => {
        dropDownAlertRef.alertWithType(type || 'error', 'Error', message);
    }, [])

    return (
        <DropdownAlert
            ref={(ref) => {
                if (ref) {
                    dropDownAlertRef = ref;
                }
            }}
        />
    );
};

export default ToastMessage;