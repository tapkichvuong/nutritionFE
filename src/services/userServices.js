import useHook from '~/utils/serverPrivate';

export const useUpdateProfile = () => {
    const {post} = useHook();
    const upload = (firstName, lastName, phone, avatar, gender,birth,street,ward,district,province, access_token) => {
        var bodyFormData = new FormData();
        bodyFormData.append("firstName", firstName);
        bodyFormData.append("lastName", lastName);
        bodyFormData.append("phone", phone);
        bodyFormData.append("avatar", avatar);
        bodyFormData.append("gender", gender);
        bodyFormData.append("birth", birth);
        bodyFormData.append("street", street);
        bodyFormData.append("ward", ward);
        bodyFormData.append("district", district);
        bodyFormData.append("province", province);
    
        var myHeaders = {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access_token}`,
            redirect: 'follow',
        };
        let path = 'v1/user';
        const config = {
            headers: myHeaders,
        };
        const res = post(path, bodyFormData, config);
        return res;
    };
    return upload;
}

export const useGetProfile = () => {
    const {get} = useHook();
    const getUser = (access_token) => {
        var myHeaders = {
            Authorization: `Bearer ${access_token}`,
        };
        let path = 'v1/user';
        const config = {
            headers: myHeaders,
        };
        const res = get(path, config);
        return res;
    };
    return getUser;
}