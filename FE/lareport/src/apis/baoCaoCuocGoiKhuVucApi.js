import axiosClient from './axiosClient';

const baoCaoCuocGoiKhuVucApi = {
    getAllWithFilters: (params) => {
        const url = "/baocaocuocgoikhuvuc";

        return axiosClient.get(url, {params});
    }
};

export default baoCaoCuocGoiKhuVucApi;