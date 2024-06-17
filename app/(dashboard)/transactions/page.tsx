'use client'

import { useState } from 'react'
import { toast } from 'sonner'
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
import { ImportCard } from '@/components/pages/transactions/ImportCard'
import { transactions } from '@/db/schema'
import { useSelectAccount } from '@/hooks/useSelectAccount'
import { useCreateTransactions } from '@/app/features/transactions/api/use-create-transactions'

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
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS)

  const newTransaction = useNewTransaction()
  const queryTransactions = useGetTransactions()
  const deleteTransactions = useDeleteTransactions()
  const createTransactions = useCreateTransactions()
  const [AccountDialog, confirm] = useSelectAccount()
  console.log(queryTransactions.data)
  const isDisabled = queryTransactions.isLoading || deleteTransactions.isPending

  const onSubmitImport = async (
    values: (typeof transactions.$inferInsert)[]
  ) => {
    const accountId = await confirm()
    if (!accountId) {
      return toast.error('Please select account to continue.')
    }

    const data = values.map(value => ({
      ...value,
      accountId: accountId as string
    }))

    createTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport()
      }
    })
  }

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results)
    setVariants(VARIANTS.IMPORT)
  }

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS)
    setVariants(VARIANTS.LIST)
  }

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
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
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
          <div className="flex flex-col lg:flex-row gap-y-2  items-center gap-x-2">
            <Button
              className="w-full lg:w-auto"
              size="sm"
              onClick={newTransaction.onOpen}
            >
              <Plus className="size-4 mr-2" />
              Add new
            </Button>
            <UploadButton onOpload={onUpload} />
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
