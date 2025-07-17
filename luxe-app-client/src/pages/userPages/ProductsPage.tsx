import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useProductFetch from "@/controller/useProductFetch";
import ProductCard from "@/components/ProductCard";
import { useLocation, useNavigate } from "react-router";
import { Slider } from "@/components/ui/slider";


  // const filteredProducts = productList.filter((product) => {
  //   const normalizedSelectedType = selectedType.toLocaleLowerCase();
  //   const matchType = normalizedSelectedType === "all" || product.type === normalizedSelectedType;
  //   const matchSearch = product.name.toLowerCase().includes(searchQueries.toLowerCase());
  //   return matchType && matchSearch;
  // });

const ProductsPage = () => {
  const [searchQueries, setSearchQueries] = useState({});
  const [filters, setFilters] = useState({category: "all", type: "all", minPrice: 0, maxPrice: 700});
  const [searchInput, setSearchInput] = useState("");
  const [isGetAll, setIsGetAll] = useState(true);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const navigate = useNavigate();
  const {search} = useLocation();
  const queries = search && search.slice(1).split("&");

  const queryObj: Record<string,string> = {};
  if(queries) queries.forEach(query => {
    const [name, value] = query.split("=");
    queryObj[name] = value;
  })


  useEffect(() => {
    if(search) {
      setIsGetAll(false)
    } else {
      setIsGetAll(true)
    }
    setSearchQueries({...queryObj})
    setFilters(currValue => ({...currValue, ...queryObj}))
  }, [search])

  const {productList, hasMore} = useProductFetch(isGetAll, pageNumber, searchInput, searchQueries);
  console.log(queryObj)


  const categories = [
    "all",
    "skin-care",
    "fragrance",
    "hair-care",
    "dental-care",
    "facial-care",
    "nail-care",
    "makeup",
  ];
  const types = [
    "all",
    "serum",
    "cream",
    "lotion",
    "liquid",
    "scrub",
    "wash",
    "soap",
    "perfume",
    "powder",
    "tool",
  ];

  const submitFilterOptions = () => {
    // setSearchQueries(currValue => ({...currValue, ...filters}))
    setPageNumber(1);
    setIsGetAll(false);
    navigate(`/products/search?category=${filters.category}&type=${filters.type}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`)
    setFilters({category: "all", type: "all", minPrice: 0, maxPrice: 700})
    setShowFilterOptions(false)
  }

  const handleFilterReset = () => {
    setFilters({category: "all", type: "all", minPrice: 0, maxPrice: 700})
  }

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen py-6 bg-cream-lighter dark:bg-stone-700">
      {/* Sidebar Filters */}
      <aside className={`${ showFilterOptions && "h-[600px]"} h-8 overflow-scroll md:sticky top-0 md:h-dvh md:w-1/4 mb-5 sm:mb-6 md:mb-0 mx-6 md:pr-6 duration-500`}>
        <button
          title="show filter options"
          type="button"
          onClick={() => (setShowFilterOptions(prevVal => !prevVal))}
          className="flex ms-auto md:ms-0 items-center gap-5 text-2xl font-semibold mb-4">
            <div className="relative md:hidden">
              <div className={`${showFilterOptions && "rotate-90"} h-1 w-3 dark:bg-white bg-black absolute inset-0 origin-center duration-500`}></div>
              <div className="h-1 w-3 dark:bg-white bg-black absolute inset-0"></div>
            </div>
            Filters 
        </button>
        <div className="flex flex-col gap-y-2">
          <label className="text-lg tracking-wider font-semibold">Categories</label>
          <div className="flex flex-wrap gap-2 mb-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filters.category === category ? "default" : "outline"}
                onClick={() => setFilters(currValue => ({...currValue, category}))}
                className="rounded-full text-left justify-start w-fit"
              >
                {category}
              </Button>
            ))}
          </div>
          <label className="text-lg tracking-wider font-semibold">Types</label>
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <Button
                key={type}
                variant={filters.type === type ? "default" : "outline"}
                onClick={() => setFilters(currValue => ({...currValue, type}))}
                className="rounded-full text-left justify-start w-fit"
              >
                {type}
              </Button>
            ))}
          </div>
          <label className="text-lg tracking-wider font-semibold">Price</label>
          <div className="flex justify-between items-center">
            <p>Min: {filters.minPrice}</p>
            <p>Max: {filters.maxPrice}</p>
          </div>
          <Slider className="mb-4" name="price" value={[filters.minPrice, filters.maxPrice]} max={700} step={1} onValueChange={(value: number[]) => setFilters(currValue => ({...currValue, minPrice: value[0], maxPrice: value[1]}))} />
          
          <Button onClick={handleFilterReset} type="button" className="bg-cream-darker dark:bg-cream-light font-bold text-lg tracking-wide">
            Reset
          </Button>
          <Button onClick={submitFilterOptions} type="button" className="font-bold text-lg tracking-wide">
            Add Filter(s)
          </Button>
        </div>
      </aside>

      {/* Product Listing */}
      <main className="md:w-3/4 px-3 sm:px-6">
        {/* Search */}
        <div className="mb-10 sm:mb-6">
          <Input
            placeholder="Search for products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="rounded-full w-full dark:bg-black dark:text-white"
          />
        </div>

        {/* Products Grid */}
        {productList ? 
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 place-items-center gap-3 sm:gap-6">
            {productList.map((product) => (
              <ProductCard key={product._id} product={product} variant="ghost"/>
            ))}
          </div>
          <div className="flex mx-auto w-fit items-center gap-4 my-4">
            <Button
            disabled={pageNumber <= 1}
            onClick={() => {
              setPageNumber(prevNum => prevNum - 1)
            }}
            className="font-bold text-black dark:text-white dark:bg-cream-darker bg-cream-light">Prev</Button>
            <p className="text-xl font-black">{pageNumber}</p>
            <Button
            disabled={!hasMore}
            onClick={() => {
              setPageNumber(prevNum => prevNum + 1)
            }}
            className="font-bold text-black dark:text-white dark:bg-cream-darker bg-cream-light">Next</Button>
          </div>
        </>
        : <div className="text-3xl pt-12 text-gray-300 font-bold text-center tracking-wider">No Product Found</div>
        }
      </main>
    </div>
  )
}

export default ProductsPage;
