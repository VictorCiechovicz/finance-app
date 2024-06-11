'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Plus } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from '@/components/DataTable'
import { Skeleton } from '@/components/ui/skeleton'
import { useNewTransaction } from '@/hooks/useNewTransaction'
import { useGetTransactions } from '@/app/features/transactions/api/use-get-transactions'
import { useDeleteTransactions } from '@/app/features/transactions/api/use-delete-transactions'
import { UploadButton } from '@/components/pages/transactions/UploadButton'

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT'
}
const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {}
}
export default function TransactionsPage() {
  const [variants, setVariants] = useState<VARIANTS>(VARIANTS.LIST)

  const newTransaction = useNewTransaction()
  const queryTransactions = useGetTransactions()
  const deleteTransactions = useDeleteTransactions()

  const isDisabled = queryTransactions.isLoading || deleteTransactions.isPending

  if (isDisabled) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  if (variants === VARIANTS.IMPORT) {
    return (
      <>
        <div>This is a screen import </div>
      </>
    )
  }
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions History
          </CardTitle>
          <div className="flex items-center gap-x-2">
            <Button size="sm" onClick={newTransaction.onOpen}>
              <Plus className="size-4 mr-2" />
              Add new
            </Button>
            <UploadButton onOpload={() => {}} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
            columns={columns}
            data={queryTransactions.data || []}
            onDelete={row => {
              const ids = row.map(r => r.original.id)
              deleteTransactions.mutate({ ids })
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}
