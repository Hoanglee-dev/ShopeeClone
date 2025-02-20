import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from '~/components/input'
import { schema, Schema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data) => {
    // console.log('🚀 ~ onSubmit ~ data:', data)
  })
  console.log('🚀 ~ Register ~ errors:', errors)
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto py-5'>
        <div className=' grid grid-cols-1 px-5 lg:grid-cols-12 lg:py-11 lg:pr-16'>
          <div className='lg:col-span-4 lg:col-start-8'>
            <form className='bg-white shadow-sm p-8 rounded' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
                type='email'
              />

              <Input
                name='password'
                register={register}
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='password'
                type='password'
              />
              <Input
                name='confirm_password'
                register={register}
                className='mt-2'
                errorMessage={errors.confirm_password?.message}
                placeholder='confirm_password'
                type='password'
              />

              <div className='mt-2'>
                <button className=' w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400 ml-1'> Bạn đã có tài khoản chưa?</span>
                <Link to='/login' className='text-red-400'>
                  {' '}
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
