import axiosClient from './axiosClient';

const baoCaoCuocGoiApi = {
    getTotal: (params) => {
        const url = "/baocaocuocgoi/total";

        return axiosClient.get(url, {params});
    },

    getDetails: () => {
        const url = "/baocaocuocgoi/detail";

        return axiosClient.get(url);
    }
}

export default baoCaoCuocGoiApi;