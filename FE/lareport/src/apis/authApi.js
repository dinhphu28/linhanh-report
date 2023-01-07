import axiosClientAuth from './axiosClientAuth';

const authApi = {
    // Sign In
    put: (data) => {
        const url = '/auth';

        return axiosClientAuth.put(url, data);
    },

    post: (data) => {
        const url = '/auth';

        return axiosClientAuth.post(url, data);
    }
};

export default authApi;