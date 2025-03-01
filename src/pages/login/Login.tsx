import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginAccount } from '~/Apis/auth.api'
import Button from '~/components/Button'
import Input from '~/components/input'
import { AppContext } from '~/Contexts/App.context'
import { ErrorResponse } from '~/types/utils.type'
import { schema, Schema } from '~/utils/rules'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  console.log('login')
  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                type: 'Server',
                message: formError[key as keyof FormData]
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto py-5'>
        <div className=' grid grid-cols-1 px-5 lg:grid-cols-12 lg:py-11 lg:pr-16'>
          <div className='lg:col-span-4 lg:col-start-8'>
            <form
              className='bg-white shadow-sm p-8 rounded'
              onSubmit={onSubmit}
              noValidate
            >
              <div className='text-2xl'>Đăng nhập</div>
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
                className='mt-3'
                errorMessage={errors.password?.message}
                placeholder='password'
                type='password'
              />
              <div className='mt-3 '>
                <Button
                  className='gap-x-2 w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center'
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400 ml-1'>
                  {' '}
                  Bạn đã có tài khoản chưa?
                </span>
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
