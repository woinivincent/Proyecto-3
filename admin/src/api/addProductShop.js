export const addProductShop = async (data, token) => {
    try {
        const params = {
            method: "POST",
            body: data,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        const response = await fetch(`http://localhost:8080/api/v1/product`, params);
        const request = await response.json();

        if (response.status !== 201) throw response;
        return request.product;
    } catch (error) {
        throw error;
    }
};
