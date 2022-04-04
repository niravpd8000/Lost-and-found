import axios from 'axios';
import React from "react";
import {AuthContext} from "../components/Context";

export const getRequest = (url, getResponse, getError, token) => {
    const headers = {
        'x-access-token': token,
    };
    axios.get(`http://localhost:8080/api/${url}`, {headers})
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
    axios.post(`http://localhost:8080/api/${url}`, data, {headers})
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
    axios.put(`http://localhost:8080/api/${url}`, data, {headers})
        .then(res => {
            getResponse(res)
        })
        .catch(error => {
            console.log(error)
        });
}