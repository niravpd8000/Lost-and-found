/**
 *  file: ToastMessage.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-21-2022
 *  last-modified: April-08-2022
 */
import React, {useRef, useEffect} from 'react';
import DropdownAlert from 'react-native-dropdownalert';

/**
 * ToastMessage component
 * @param type
 * @param message
 * @returns {JSX.Element}
 * @constructor
 */
const ToastMessage = ({type, message}) => {
    let dropDownAlertRef = useRef();
    /** useEffect will call when component will first time rendering and also for provided dependency */
    useEffect(() => {
        dropDownAlertRef.alertWithType(type || 'error', 'Error', message || "Error");
    }, [])

    /**
     * Reusable ToastMessage Component for displaying error and success messages
     */
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