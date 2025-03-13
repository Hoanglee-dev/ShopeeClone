import { Category } from '~/types/category.type'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import classNames from 'classnames'
import Ratingstar from '../RatingStar/Ratingstar'
import Button from '~/components/Button'
import { QueryConfig } from '~/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

export default function AsideFilter({ categories, queryConfig }: Props) {
  const navigate = useNavigate()

  const handleRemoveAll = () => {
    navigate({
      pathname: '/',
      search: createSearchParams(omit(queryConfig, ['category', 'rating_filter'])).toString()
    })
  }
  const { category } = queryConfig
  return (
    <div className='py-4 '>
      <Link to='' className='flex items-center font-bold'>
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {categories.map((categoryItems) => {
          const isActive = category === categoryItems._id
          return (
            <li className='py-2 pl-2' key={categoryItems._id}>
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItems._id
                  }).toString()
                }}
                className={classNames('relative px-2 ', {
                  'text-orange font-semibold': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='fill-orange h-2 w-2 absolute top-1 left-[-10px]'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItems.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to='/home' className='flex items-center font-bold mt-4 uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='w-3 h-4 fill-current stroke-current mr-3'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        {/* <div className=''>Khoảng giá</div>
        <form className='mt-2'>
          <div className='flex items-start'>
            <Input
              type='text'
              className='grow'
              name='from'
              classNameInput='p-1 w-full outline-none text-xs border bg-white border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              placeholder='₫ TỪ'
            />
            <div className='mx-1  shrink-0 rgba(160, 154, 154, 0.8) '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
              </svg>
            </div>
            <Input
              type='text'
              className='grow'
              name='from'
              classNameInput='p-1 w-full outline-none text-xs border bg-white border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              placeholder='₫ ĐẾN'
            />
          </div>
          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>
            Áp dụng
          </Button>
        </form> */}
        {/* <div className='bg-gray-300 h-[1px] my-4' /> */}
        <div className='text-sm'>Đánh giá</div>
        <Ratingstar queryConfig={queryConfig} />
        <div className='bg-gray-300 h-[1px] my-4' />
        <Button
          onClick={handleRemoveAll}
          className=' w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center hover:cursor-pointer'
        >
          Xoá tất cả
        </Button>
      </div>
    </div>
  )
}
