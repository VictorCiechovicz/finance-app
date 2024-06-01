'use client'

import { EditAccountSheet } from '@/components/pages/accounts/EditAccountSheet'
import { NewAccountSheet } from '@/components/pages/accounts/NewAccountSheet'

import { EditCategorySheet } from '@/components/pages/categories/EditCategorySheet'
import { NewCategorySheet } from '@/components/pages/categories/NewCategorySheet'

import { useMountedState } from 'react-use'

export const SheetProvider = () => {
  const isMounted = useMountedState()

  if (!isMounted) return null

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <EditCategorySheet />
      <NewCategorySheet />
    </>
  )
}
