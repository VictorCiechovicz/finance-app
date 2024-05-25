'use client'

import { useNewAccount } from '@/hooks/useNewAccounts'

export default function Home() {
  const { onOpen } = useNewAccount()
  return <div onClick={onOpen}>dashboard</div>
}
