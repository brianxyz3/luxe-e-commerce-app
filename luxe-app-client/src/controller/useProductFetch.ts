import axios from 'axios'
import { useEffect, useState } from 'react'

export interface ProductType {
    _id: string;
    name: string;
    category: string;
    brandName: string;
    description: string;
    type: string;
    price: number;
}

function useProductFetch(pageNumber: number, category?: string) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [productList, setProductList] = useState<ProductType[]>([]);

    useEffect(() => {
        setIsLoading(true);
        setError(false);
        let cancel: () => void
        axios.get(
            "http://localhost:7000/products",
            {
            params: {
                page: pageNumber,
                category,
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(response => {
            setProductList([...response.data]);
            setHasMore(response.data.length > 0);
            setIsLoading(false);
        }).catch(err => {
            if(axios.isCancel(err)) return;
            console.log("error occured" + err)
            setError(true)
        })
        return () => cancel()
    }, [pageNumber, category])

  return {productList, isLoading, error, hasMore}
}

export default useProductFetch