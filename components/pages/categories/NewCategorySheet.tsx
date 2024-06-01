import { useNewCategory } from '@/hooks/useNewCategory'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '../../ui/sheet'
import { FormCategory, FormValues } from './CategoriesForm'
import { useCreateCategories } from '@/app/features/categories/api/use-create-categories'

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory()
  const mutation = useCreateCategories()

  const onSubmit = (value: FormValues) => {
    mutation.mutate(value, {
      onSuccess: () => {
        onClose()
      }
    })
  }
  const onDelete = () => {}

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to track your transactions
          </SheetDescription>
        </SheetHeader>
        <FormCategory
          onSubmit={onSubmit}
          onDelete={onDelete}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  )
}
