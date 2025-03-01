import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'
import Product from './Product/Product'
import { useQuery } from '@tanstack/react-query'
import { useQueryParam } from '~/hooks/useQueryParams'
import productApi from '~/Apis/product.api'

export default function ProductList() {
  const queryParams = useQueryParam()
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProduct(queryParams)
    }
  })
  // md:pl-20 lg:pl-16
  return (
    <div className='bg-[#F5F5F5] py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 '>
          <div className='col-span-2 '>
            <AsideFilter />
          </div>

          <div className='col-span-10 pl-3'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3  '>
              {data &&
                data.data.data.products.map((product) => (
                  <div className='col-span-1 ' key={product}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
