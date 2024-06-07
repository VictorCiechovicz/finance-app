'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { InferResponseType } from 'hono'
import { client } from '@/lib/hono'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useOpenAccount } from '@/hooks/useOpenAccount'
import { ConfirmModal } from '@/components/ConfirmModal'
import { useDeleteAccount } from '@/app/features/accounts/api/use-delete-account'
import { format } from 'date-fns'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export type ResponseType = InferResponseType<
  typeof client.api.transactions.$get,
  200
>['data'][0]

type ActionsProps = {
  id: string
}
const Actions = ({ id }: ActionsProps) => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false)

  const { onOpen } = useOpenAccount()
  const deleteMutation = useDeleteAccount(id)

  const handleDelete = async () => {
    await deleteMutation.mutate()
    setOpenModalConfirm(false)
  }

  return (
    <>
      <ConfirmModal
        title="Are you sure?"
        description="You are about to delete this transaction"
        openModalConfirm={openModalConfirm}
        setOpenModalConfirm={setOpenModalConfirm}
        handleSubmit={handleDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={false}
            onClick={() => setOpenModalConfirm(true)}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue('date') as Date
      return <span>{format(date, 'dd MMMM, yyyy')}</span>
    }
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <span>{row.original.category}</span>
    }
  },
  {
    accessorKey: 'payee',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Payee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      return (
        <Badge
          variant={amount < 0 ? 'destructive' : 'primary'}
          className="text-xs font-medium px-3.5 py-2.5"
        >
          {formatCurrency(amount)}
        </Badge>
      )
    }
  },

  {
    accessorKey: 'account',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Account
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <span>{row.original.account}</span>
    }
  },

  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id} />
  }
]
