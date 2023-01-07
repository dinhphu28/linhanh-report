import axiosClientAuth from "./axiosClientAuth";

const groupApi = {
    getAll: () => {
        const url = "/groups";

        return axiosClientAuth.get(url);
    }
};

export default groupApi;