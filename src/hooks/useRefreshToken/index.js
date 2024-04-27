import { useState } from 'react';
import useAuth from '~/hooks/useAuth';
import { useRefresh } from '~/services/authServices';
const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refreshAccess = useRefresh();
    const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem('refreshToken') || undefined);
    const refresh = async () => {
        const response = await refreshAccess(refreshToken);
        setAuth((prev) => {
            console.log(JSON.stringify(prev));
            console.log(response?.access_token);
            return { ...prev, user: response?.username, role: response?.role, accessToken: response?.access_token };
        });
        return response?.access_token;
    };
    return refresh;
};

export default useRefreshToken;
