import axios from 'axios';
import React from 'react';

const axiosSecure = () => {

    const secure = axios.create({
        baseURL : 'http://localhost:3000'
    })

    return secure;
};

export default axiosSecure;