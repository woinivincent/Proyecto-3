export const getFetchProducts = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (response.status !== 200) throw response;
        return data;
    } catch (error) {
        throw error;
    }
};
