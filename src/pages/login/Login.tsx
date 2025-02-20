import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto py-5'>
        <div className=' grid grid-cols-1 px-5 lg:grid-cols-12 lg:py-11 lg:pr-16'>
          <div className='lg:col-span-4 lg:col-start-8'>
            <form className='bg-white shadow-sm p-8 rounded'>
              <div className='text-2xl'>Đăng nhập</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email/Số điện thoại/Tên đăng nhập'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <div className='mt-1 ml-1 text-red-600 min-h-4 text-sm'></div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  placeholder='Mật khẩu'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <div className='mt-1 ml-1 text-red-600 min-h-4 text-sm'></div>
              </div>
              <div className='mt-3'>
                <div className='button w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng nhập
                </div>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400 ml-1'> Bạn đã có tài khoản chưa?</span>
                <Link to='/register' className='text-red-400'>
                  {' '}
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
