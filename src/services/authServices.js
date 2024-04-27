import * as serverPublic from '~/utils/serverPublic';

export const useRegister = () => {
    const register = (userCode, password, email, role) => {
        let path = 'v1/auth/register';
        path = path.concat('/' + role.toLowerCase());
        const res = serverPublic.post(path, {
            userName: userCode,
            password: password,
            email: email,
            role: role,
        });
        return res;
    };
    return register;
}

export const useLogin = () => {
    const login = (userCode, password) => {
        let path = 'v1/auth/authenticate';
        const res = serverPublic.post(path, {
            userName: userCode,
            password: password,
        });
        return res;
    };
    return login;
};

export const useRevokedToken = () => {
    const revoked = (access_token) => {
        let path = 'v1/auth/logout';
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        const res = serverPublic.post(path, {}, config);
        return res;
    };
    return revoked;
}

export const useRefresh = () => {
    const refresh = (refresh_token) => {
        let path = 'v1/auth/refresh-token';
        const myConfig = {
            headers: { Authorization: `Bearer ${refresh_token}` },
        };
        const res = serverPublic.post(path, {}, myConfig);
        return res;
    };
    return refresh;
}
