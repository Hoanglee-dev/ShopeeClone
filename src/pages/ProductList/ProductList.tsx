import AsideFilter from './components/AsideFilter'
import SortProductList from './components/SortProductList'
import Product from './components/Product/Product'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import productApi from '~/Apis/product.api'
import Paginate from '~/components/Paginate'
import { ProductListConfig } from '~/types/product.type'
import categoryApi from '~/Apis/category.api'
import useQueryConfig from '~/hooks/useQueryConfig'

export default function ProductList() {
  const queryConfig = useQueryConfig()
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
