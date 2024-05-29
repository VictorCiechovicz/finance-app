'use client'

import { EditAccountSheet } from '@/components/EditAccountSheet'
import { NewAccountSheet } from '@/components/NewAccountSheet'
import { useMountedState } from 'react-use'

export const SheetProvider = () => {
  const isMounted = useMountedState()

  if (!isMounted) return null

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  )
}
