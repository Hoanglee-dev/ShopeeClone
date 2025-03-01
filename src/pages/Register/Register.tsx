import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from '~/components/input'
import { schema, Schema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '~/Apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import { ErrorResponse } from '~/types/utils.type'
import { useContext } from 'react'
import { AppContext } from '~/Contexts/App.context'
import Button from '~/components/Button'
type FormData = Schema

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) =>
      registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<
            ErrorResponse<Omit<FormData, 'confirm_password'>>
          >(error)
        ) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                type: 'Server',
                message:
                  formError[key as keyof Omit<FormData, 'confirm_password'>]
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
                <Button
                  className='gap-x-2 w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400 ml-1'>
                  {' '}
                  Bạn đã có tài khoản chưa?
                </span>
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
