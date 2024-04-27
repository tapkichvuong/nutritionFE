import axios from 'axios';
import { useEffect } from 'react';
import useRefreshToken from '~/hooks/useRefreshToken';
import useAuth from '~/hooks/useAuth';

const javaApiClient = axios.create({
    baseURL: process.env.REACT_APP_JAVA_URL,
});

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = javaApiClient.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseIntercept = javaApiClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return javaApiClient(prevRequest);
                }
                return Promise.reject(error);
            },
        );

        return () => {
            javaApiClient.interceptors.request.eject(requestIntercept);
            javaApiClient.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return javaApiClient;
};

export default useAxiosPrivate;
