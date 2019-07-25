import adapter from 'axios/lib/adapters/http';
const axios = require('axios');

class JobService {

    constructor(baseUrl, port) {
        this.baseUrl = baseUrl;
        this.port = port;
    }

    getJob(id) {
        return axios.request({
            method: 'GET',
            url: `/ats/api/jobs/${id}`,
            baseURL: `${this.baseUrl}:${this.port}`,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MzAxMzg3NzQsImFjY291bnRfaWQiOjUxMTE3Njk1NywibWVtYmVyX2lkIjo1ODgzMTI3NDMsImlzc3VlciI6IldvcmthYmxlIiwiaXNzdWVkX2F0IjoiMjAxOS0wNy0yOSAwOToxODo0OCBVVEMiLCJhY2NfdWlkIjoiMGI4ZDVkZmMtNWJiMi01YWRjLTgxMWItZjU1ODMyYjA5ZmRiIiwic3ViIjoiZDZmNTdlYWEtZGE4YS01YzU5LWExYTEtOGViZTM0MDM0YjhhIn0.DYBFi9Wwcv07m8swpPuiMbopcyn59qLv4zNDjJZqBaw'
            }
        }, adapter).then((response) => {
            const job = response.data;
            return new Promise((resolve, reject) => {
                try {
                    resolve(job);
                } catch (error) {
                    reject(error);
                }
            });
        });
    };

}

export default JobService;

