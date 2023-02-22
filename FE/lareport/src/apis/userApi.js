import axiosClientAuth from "./axiosClientAuth";

const userApi = {
    getAll: () => {
        const url = "/users";

        return axiosClientAuth.get(url);
    },

    putChangePassword: (username, data) => {
        const url = `/users/${username}`;

        return axiosClientAuth.put(url, data);
    },

    delete: (username) => {
        const url = `/users/${username}`;

        return axiosClientAuth.delete(url);
    },

    getSecKey: (username) => {
        const url = `/users/sec-keys/${username}`;

        return axiosClientAuth.get(url);
    }
};

export default userApi;