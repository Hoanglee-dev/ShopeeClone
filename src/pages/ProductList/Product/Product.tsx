import { Link } from 'react-router-dom'
import { Product as ProductType } from '~/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from '~/utils/utils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to='/'>
      <div className='h-full bg-white shadow-sm hover:translate-y-[-0.065rem] hover:shadow-md duration-100 transition-transform '>
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[1.75rem] line-clamp-2 text-sm'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              <span> {formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='text-orange truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mb-2 mt-4 flex items-center space-x-1'>
            <div className='flex-none flex items-center space-x-0.5 ' aria-hidden='true'>
              <img
                src='https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.47/pc/d7099d3fd1dfdaf705ab.svg'
                width={11}
                height={11}
                alt='rating-star-full'
              />
              <div className='text-shopee-black87 text-xs/sp14 flex-none'>{product.rating}</div>
            </div>
            <div className='ml-1 h-fit scale-x-50  border-gray-500'>|</div>
            <div className='truncate text-shopee-black87 text-sm min-h-4 text-center'>
              Đã bán {formatNumberToSocialStyle(product.sold)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
