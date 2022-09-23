import axios from 'axios';

const axiosUsers = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});


axiosUsers.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        // document.cookie = `c_user=`;
        let res = error.response;
        if(res === undefined) {
            console.error("API not working")
        }
        console.log(res);
        // window.location.assign("/");
        return Promise.reject(error);
    }
);

export default axiosUsers;