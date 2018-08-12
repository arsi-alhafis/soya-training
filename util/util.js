export const parseQueryString = (queryString = window.location.search.substr(1)) => {
    const cleanQueryString = queryString.substr(0, 1) === '?' ? queryString.substr(1) : queryString;

    return cleanQueryString.split('&').reduce((params, param) => {
        const splitParam = param.split(/=/);
        if (splitParam.length > 1) {
            params[splitParam[0]] = splitParam[1];
        }
        return params;
    }, {});
};
