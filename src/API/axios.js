/**
 *  file: axios.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-21-2022
 *  last-modified: April-08-2022
 */

import axios from 'axios';
import React from "react";

const baseUrl =
        "https://obscure-peak-45590.herokuapp.com"
    // "http://localhost:8080"
;

/**
 * getRequest
 * Purpose: This function used for calling api with get request
 * Parameter(s):
 * <1> url: api url
 * <2> getResponse: for handling response
 * <3> getError: for handling error
 * <4> token: for authorising
 * Precondition(s):
 * N/A
 *
 * Returns: N/A
 *
 * Side effect:
 * <1> This function will be call and provide response from Api
 */
export const getRequest = (url, getResponse, getError, token) => {
    const headers = {
        'x-access-token': token,
    };
    axios.get(`${baseUrl}/api/${url}`, {headers})
        .then(res => {
            getResponse(res)
        })
        .catch(error => {
            getError(error)
        });
}

/**
 * postRequest
 * Purpose: This function used for calling api with post request
 * Parameter(s):
 * <1> url: api url
 * <2> data: api payload
 * <3> getResponse: for handling response
 * <4> getError: for handling error
 * <5> token: for authorising
 *
 * Precondition(s):
 * N/A
 *
 * Returns: N/A
 *
 * Side effect:
 * <1> This function will be call and provide response from Api
 */

export const postRequest = (url, data, getResponse, getError, token) => {
    const headers = {
        'x-access-token': token,
    };
    axios.post(`${baseUrl}/api/${url}`, data, {headers})
        .then(res => {
            getResponse(res)
        })
        .catch(error => {
            getError(error?.response?.data?.message || "Error while processing request")
        });
}

/**
 * putRequest
 * Purpose: This function used for calling api with put request
 * Parameter(s):
 * <1> url: api url
 * <2> data: api payload
 * <3> getResponse: for handling response
 * <4> getError: for handling error
 * <5> token: for authorising
 *
 * Precondition(s):
 * N/A
 *
 * Returns: N/A
 *
 * Side effect:
 * <1> This function will be call and provide response from Api
 */
export const putRequest = ({url, data, getResponse, getError, token}) => {
    const headers = {
        'Authorization': 'Bearer my-token',
    };
    axios.put(`${baseUrl}/api/${url}`, data, {headers})
        .then(res => {
            getResponse(res)
        })
        .catch(error => {
            getError(error?.response?.data?.message || "Error while processing request")
        });
}