import axiosClient from "./axiosClient";

const baoCaoTop10AgentsMaxNOCallsApi = {
    getAllWithFilters: (params) => {
        const url = "/top10agentsmaxnocalls";

        return axiosClient.get(url, {params});
    }
};

export default baoCaoTop10AgentsMaxNOCallsApi;