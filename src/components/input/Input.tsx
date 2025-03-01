import React, { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  rule?: RegisterOptions
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  register,
  className,
  errorMessage,
  name,
  placeholder,
  rule,
  type,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 ml-1 text-red-600 min-h-4 text-sm'
}: Props) {
  const registerResult = register && name ? register(name, rule) : {}
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        className={classNameInput}
        {...registerResult}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
