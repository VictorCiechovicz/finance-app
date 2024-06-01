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
import { useOpenCategory } from '@/hooks/useOpenCategory'
import { ConfirmModal } from '@/components/ConfirmModal'
import { useDeleteCategory } from '@/app/features/categories/api/use-delete-category'

export type ResponseType = InferResponseType<
  typeof client.api.categories.$get,
  200
>['data'][0]

type ActionsProps = {
  id: string
}
const Actions = ({ id }: ActionsProps) => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false)

  const { onOpen } = useOpenCategory()
  const deleteMutation = useDeleteCategory(id)

  const handleDelete = async () => {
    await deleteMutation.mutate()
    setOpenModalConfirm(false)
  }

  return (
    <>
      <ConfirmModal
        title="Are you sure?"
        description="You are about to delete this category"
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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id} />
  }
]
