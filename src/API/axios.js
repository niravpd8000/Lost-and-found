import axios from 'axios';

export const getRequest = ({url, getResponse}) => {
    axios.get(`http://localhost:8080/api/${url}`)
        .then(res => {
            getResponse(res)
        })
        .catch(error => {
            console.log(error)
        });
}


export const postRequest = (url, data, getResponse, getError) => {
    const headers = {
        'Authorization': 'Bearer my-token',
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