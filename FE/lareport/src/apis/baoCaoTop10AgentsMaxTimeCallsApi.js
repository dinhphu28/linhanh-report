import axiosClient from "./axiosClient";

const baoCaoTop10AgentsMaxTimeCallsApi = {
    getAllWithFilters: (params) => {
        const url = "/top10agentsmaxtimecalls";

        return axiosClient.get(url, {params});
    }
};

export default baoCaoTop10AgentsMaxTimeCallsApi;