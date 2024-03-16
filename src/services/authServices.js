import * as localRequest from '~/utils/localRequest';

export const register = (userCode, password, email, role) => {
    let path = 'v1/auth/register';
    path = path.concat('/' + role.toLowerCase());
    const res = localRequest.post(path, {
        userName: userCode,
        password: password,
        email: email,
        role: role,
    });
    return res;
};

export const login = (userCode, password) => {
    let path = 'v1/auth/authenticate';
    const res = localRequest.post(path, {
        userName: userCode,
        password: password,
    });
    return res;
};

export const logout = (access_token) => {
    let path = 'v1/auth/logout';
    const config = {
        headers: { Authorization: `Bearer ${access_token}` },
    };
    const res = localRequest.post(path, config);
    return res;
};
