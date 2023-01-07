import axiosClientAuth from "./axiosClientAuth";

const userGroupApi = {
    getByUsername: (params) => {
        const url = "/user-groups";

        return axiosClientAuth.get(url, {params});
    },

    put: (data) => {
        const url = "/user-groups";

        return axiosClientAuth.put(url, data);
    }
};

export default userGroupApi;