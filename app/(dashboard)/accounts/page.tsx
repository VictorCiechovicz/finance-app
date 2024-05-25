'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNewAccount } from '@/hooks/useNewAccounts'
import { Plus } from 'lucide-react'
import { columns, Payment } from './columns'
import { DataTable } from '@/components/data-table'

export default function AccountsPage() {
  const newAccount = useNewAccount()

  const data: Payment[] = [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'a@example.com'
    },
    {
      id: '728ed52g',
      amount: 100,
      status: 'failed',
      email: 'm@example.com'
    }
  ]
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts Page</CardTitle>
          <Button size="sm" onClick={newAccount.onOpen}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="email"
            columns={columns}
            data={data}
            onDelete={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  )
}
