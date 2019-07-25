import adapter from 'axios/lib/adapters/http';
const axios = require('axios');

class JobTitlesService {

    constructor(baseUrl, port) {
        this.baseUrl = baseUrl;
        this.port = port;
    }

    getJobTitles() {
        return axios.request({
            method: 'GET',
            url: '/ats/api/job_titles',
            baseURL: `${this.baseUrl}:${this.port}`,
            headers: {
                'Accept': 'application/json; charset=utf-8'
            }
        }, adapter).then((response) => {
            const titles = response.data;
            return new Promise((resolve, reject) => {
                try {
                    resolve(titles);
                } catch (error) {
                    reject(error);
                }
            });
        });
    };

}

export default JobTitlesService;

