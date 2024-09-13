import axios, { AxiosRequestConfig } from 'axios';

const httpClient = axios.create({ baseURL: `/api` });

function dataGet<T>(url: string, config?: AxiosRequestConfig) {
    return () => httpClient.get<T>(url, config).then((x) => x.data);
}

export default httpClient;
export { dataGet };
