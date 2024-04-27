import jsonServerProvider from 'ra-data-json-server';
import useAuth from '~/hooks/useAuth';
import { fetchUtils } from 'react-admin';

const useHttpClient = () => {
    const { auth } = useAuth();
    const httpClient = (url, options = {}) => {
        options.user = {
            authenticated: true,
            token: `Bearer ${auth?.accessToken}`,
        };
        return fetchUtils.fetchJson(url, options);
    };
    return httpClient;
};

export const useDataProvider = () => {
    const httpClient = useHttpClient();
    return jsonServerProvider(process.env.REACT_APP_JAVA_URL + 'v1/posts', httpClient);
};
