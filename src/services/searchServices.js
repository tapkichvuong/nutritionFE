import * as serverPublic from '~/utils/serverPublic';

export const useSearch = () => {
    const search = (raw) => {
        let path = `v1/user/search?query=${raw}`;
        const res = serverPublic.get(path);
        return res;
    };
    return search;
}