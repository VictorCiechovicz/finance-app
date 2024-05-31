'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '../../ui/sheet'
import { FormCategory, FormValues } from './CategoriesForm'
import { useOpenCategory } from '@/hooks/useOpenCategory'
import { useGetCategory } from '@/app/features/categories/api/use-get-category'
import { Loader2 } from 'lucide-react'
import { useEditCategories } from '@/app/features/categories/api/use-edit-categories'
import { useDeleteCategory } from '@/app/features/categories/api/use-delete-category'
import { ConfirmModal } from '../../ConfirmModal'
import { useState } from 'react'

export const EditAccountSheet = () => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false)

  const { isOpen, onClose, id } = useOpenCategory()
  const categoryQuery = useGetCategory(id)
  const editMutation = useEditCategories(id)
  const deleteMutation = useDeleteCategory(id)

  const isLoading = categoryQuery.isLoading
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

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name
      }
    : {
        name: ''
      }
  return (
    <>
      <ConfirmModal
        title="Are you sure?"
        description="You are about perform a bulk delete"
        openModalConfirm={openModalConfirm}
        setOpenModalConfirm={setOpenModalConfirm}
        handleSubmit={handleDelete}
      />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <FormCategory
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
