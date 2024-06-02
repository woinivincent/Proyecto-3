export const deleteProductCart = async (id, token) => {
    try {
        const params = {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        };
        const response = await fetch(`http://localhost:8080/api/v1/cart/${id}`, params);
        if (response.status !== 200) throw response;
        return response;
    } catch (error) {
        throw error;
    }
};
