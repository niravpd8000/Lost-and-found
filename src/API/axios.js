import axios from 'axios';
import React from "react";

const baseUrl =
        "https://obscure-peak-45590.herokuapp.com"
    // "http://localhost:8080"
;

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

export const putRequest = ({url, data, getResponse}) => {
    const headers = {
        'Authorization': 'Bearer my-token',
    };
    axios.put(`${baseUrl}/api/${url}`, data, {headers})
        .then(res => {
            getResponse(res)
        })
        .catch(error => {
            console.log(error)
        });
}