'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '../../ui/sheet'
import { FormAccount, FormValues } from './AccountForm'
import { useOpenAccount } from '@/hooks/useOpenAccount'
import { useGetAccount } from '@/app/features/accounts/api/use-get-account'
import { Loader2 } from 'lucide-react'
import { useEditAccounts } from '@/app/features/accounts/api/use-edit-accounts'
import { useDeleteAccount } from '@/app/features/accounts/api/use-delete-account'
import { ConfirmModal } from '../../ConfirmModal'
import { useState } from 'react'

export const EditAccountSheet = () => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false)

  const { isOpen, onClose, id } = useOpenAccount()
  const accountQuery = useGetAccount(id)
  const editMutation = useEditAccounts(id)
  const deleteMutation = useDeleteAccount(id)

  const isLoading = accountQuery.isLoading
  const isPending = editMutation.isPending || deleteMutation.isPending

  const onSubmit = (value: FormValues) => {
    editMutation.mutate(value, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const handleDelete = async () => {
    await deleteMutation.mutate()
    onClose()
    setOpenModalConfirm(false)
  }

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name
      }
    : {
        name: ''
      }
  return (
    <>
      <ConfirmModal
        title="Are you sure?"
        description="You are about to delete this account"
        openModalConfirm={openModalConfirm}
        setOpenModalConfirm={setOpenModalConfirm}
        handleSubmit={handleDelete}
      />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <FormAccount
              id={id}
              onSubmit={onSubmit}
              onDelete={() => setOpenModalConfirm(true)}
              disabled={isPending}
              defaultValues={defaultValues}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
