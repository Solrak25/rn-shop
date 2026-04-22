import api from "@/lib/api";


const emptyProduct = {
    id: '',
    title: 'Nuevo producto',
    description: '',
    price: 0,
    images: [],
    slug: '',
    gender: 'men',
    sizes: [],
    stock: 0,
    tags: [],
}



export const getProducts = async (limit = 20, offset = 0, gender = 'all') => {
    try {
        const { data } = await api.get('/products', {
            params: {
                limit,
                offset,
                gender: gender === 'all' ? undefined : gender,
            },
        });

        return data;
    } catch (error) {
        throw new Error('Unable to load products');
    }
}





export const getProductById = async (id) => {
    if (id === 'new') return emptyProduct;

    try {
        const { data } = await api.get(`/products/${id}`);
        return data;
    } catch (error) {
        throw new Error(`product with id ${id} not found`);
    }
}
