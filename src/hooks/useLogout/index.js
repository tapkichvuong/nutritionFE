import { useNavigate } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import { useRevokedToken } from '~/services/authServices';
const useLogout = () => {
    const { auth, setAuth } = useAuth();
    const revoked = useRevokedToken();
    const logout = async () => {
        try {
            const response = await revoked(auth?.accessToken);
            setAuth({});
            sessionStorage.clear();
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
