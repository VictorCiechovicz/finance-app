'use client'

import { useGetSummary } from '@/app/features/summary/api/use-get-summary'
import { formatDateRange } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { FaPiggyBank } from 'react-icons/fa'
import { DataCard } from './dataCard'

export const DataGrid = () => {
  const { data } = useGetSummary()
  const params = useSearchParams()
  const to = params.get('to') || undefined
  const from = params.get('from') || undefined

  const dateRangeLabel = formatDateRange({ to, from })
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Remainig"
        value={data?.ramainingAmount}
        percentageChange={data?.ramainingChange}
        icon={FaPiggyBank}
        variant="default"
        dateRange={dateRangeLabel}
      />
    </div>
  )
}
