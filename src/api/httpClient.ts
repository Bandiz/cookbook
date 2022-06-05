import axios, { AxiosRequestConfig } from 'axios';

const httpClient = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}` });

function dataGet<T>(url: string, config?: AxiosRequestConfig) {
    return () => httpClient.get<T>(url, config).then((x) => x.data);
}

export default httpClient;
export { dataGet };
