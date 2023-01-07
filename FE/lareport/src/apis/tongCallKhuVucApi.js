import axiosClient from "./axiosClient";

const tongCallKhuVucApi = {
    getAllWithFilters: (params) => {
        const url = "/tongcallkhuvuc";

        return axiosClient.get(url, {params});
    }
};

export default tongCallKhuVucApi;