/**
 *  file: App.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-15-2022
 *  last-modified: April-08-2022
 */
import React from "react";
import Main from "./src/navigation/router";
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * App
 * @returns {JSX.Element}
 * @constructor
 */
export default function App() {
    return (
        <SafeAreaProvider>
            <Main/>
        </SafeAreaProvider>
    );
}
