'use client'

import { useGetAccounts } from '@/app/features/accounts/api/use-get-accounts'
import { useGetSummary } from '@/app/features/summary/api/use-get-summary'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

export const AccountFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const accountId = params.get('accountId') || 'all'
  const from = params.get('from') || ''
  const to = params.get('to') || ''
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts()
  const { isLoading: isLoadingSummary } = useGetSummary()
  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to
    }

    if (newValue === 'all') {
      query.accountId = ''
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query
      },
      { skipNull: true, skipEmptyString: true }
    )
    router.push(url)
  }
  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger className="lg:w-auto w-full h-9 rounded-md bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All accounts</SelectItem>
        {accounts?.map(account => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
