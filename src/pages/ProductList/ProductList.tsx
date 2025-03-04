import AsideFilter from './components/AsideFilter'
import SortProductList from './components/SortProductList'
import Product from './components/Product/Product'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useQueryParam } from '~/hooks/useQueryParams'
import productApi from '~/Apis/product.api'
import Paginate from '~/components/Paginate'
import { ProductListConfig } from '~/types/product.type'
import { isUndefined, omitBy } from 'lodash'
import categoryApi from '~/Apis/category.api'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      category: queryParams.category,
      exclude: queryParams.exclude,
      limit: queryParams.limit || 10,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by
    },
    isUndefined
  )
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProduct(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData
  })
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  return (
    <div className='bg-[#F5F5F5] py-6'>
      <div className='container'>
        {productData && (
          <div className='grid grid-cols-12 '>
            <div className='col-span-2 '>
              <AsideFilter
                queryConfig={queryConfig}
                categories={Array.isArray(categoriesData?.data.data) ? categoriesData?.data.data : []}
              />
            </div>

            <div className='col-span-10 pl-3'>
              <SortProductList queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 '>
                {productData.data.data.products.map((product) => (
                  <div className='col-span-1 ' key={product}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Paginate queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
