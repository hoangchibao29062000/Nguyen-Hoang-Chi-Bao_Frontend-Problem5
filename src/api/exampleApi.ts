import axiosClient from './axiosClient';

const exampleApi = {
    getListUser(): Promise<any>{
        const url = "/users";
        return axiosClient.get(url)
    }
}

export default exampleApi;