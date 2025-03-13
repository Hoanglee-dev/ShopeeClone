import { Link } from 'react-router-dom'
import path from '~/Constants/path'
import { Product as ProductType } from '~/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from '~/utils/utils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${product._id}`}>
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
          {/* <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
            {rateSale(product.price_before_discount, product.price)} giảm
          </div> */}
          <div className='mt-2 pointer-events-none overflow-hidden h-4 flex-grow-0 flex-shrink-1 flex flex-row justify-start items-stretch'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='-0.5 -0.5 4 16' className='flex-none h-full -mr-px'>
              <path
                d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                strokeWidth={1}
                stroke='#F69113'
                fill='#F69113'
              />
            </svg>
            <div className='truncate bg-[#F69113] text-white leading-4 text-xs  px-px'>
              Giảm {rateSale(product.price_before_discount, product.price)}
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='-0.5 -0.5 4 16'
              className='rotate-180 flex-none h-full -ml-px'
            >
              <path
                d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                strokeWidth={1}
                stroke='#F69113'
                fill='#F69113'
              />
            </svg>
          </div>
          <div className='mb-2 mt-2 flex items-center space-x-1'>
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
