import axios from 'axios'
import { useEffect, useState } from 'react'

export interface ProductType {
    _id: string;
    name: string;
    category: string[];
    brandName: string;
    description: string;
    type: string[];
    price: number;
}

function useProductFetch(isGetAll: boolean, pageNumber: number, searchInput?:string,  searchFilter?: Record<string, string>) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [productList, setProductList] = useState<ProductType[] | undefined>([]);

    let apiUrl;
    if (isGetAll) {
        apiUrl = "/api/products";
    } else {
        apiUrl = "/api/products/search";
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
            if (response.data.length > 0) {
                setProductList([...response.data]);
            } else {
                setProductList(undefined);
            }
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