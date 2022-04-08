/**
 *  file: ToastMessage.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-21-2022
 *  last-modified: April-08-2022
 */
import React, {useRef, useEffect} from 'react';
import DropdownAlert from 'react-native-dropdownalert';

const ToastMessage = ({type, message}) => {
    let dropDownAlertRef = useRef();
    useEffect(() => {
        dropDownAlertRef.alertWithType(type || 'error', 'Error', message || "Error");
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