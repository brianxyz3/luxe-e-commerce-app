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

function useProductFetch(isGetAll: boolean, pageNumber: number, searchInput?:string,  searchFilter?: Record<string, string>) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [productList, setProductList] = useState<ProductType[]>([]);

    let apiUrl;
    if (isGetAll) {
        console.log("get all products")
        apiUrl = "http://localhost:3000/api/products";
    } else {
        apiUrl = "http://localhost:3000/api/products/search";
    }


    useEffect(() => {
        setIsLoading(true);
        setError(false);
        let cancel: () => void
        axios.get(
            apiUrl,
            {
            params: {
                page: pageNumber,
                ...searchFilter,
                searchInput
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(response => {
            if (response.data.length > 0)setProductList([...response.data]);
            setHasMore(response.data.length > 0);
            setIsLoading(false);
        }).catch(err => {
            if(axios.isCancel(err)) return;
            console.log("error occured" + err)
            setError(true)
        })
        return () => cancel()
    }, [pageNumber, searchInput, searchFilter])

  return {productList, isLoading, error, hasMore}
}

export default useProductFetch