import React from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props {
  className?: string
  type?: string
  placeholder?: string
  register: UseFormRegister<any>
  name: string
  rule?: RegisterOptions
  errorMessage?: string
}

export default function Input({ register, className, errorMessage, name, placeholder, rule, type }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        {...register(name, rule)}
      />
      <div className='mt-1 ml-1 text-red-600 min-h-4 text-sm'>{errorMessage}</div>
    </div>
  )
}
