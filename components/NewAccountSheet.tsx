import { useNewAccount } from '@/hooks/useNewAccounts'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from './ui/sheet'
import { FormAccount, FormValues } from './AccountForm'
import { useCreateAccounts } from '@/app/features/accounts/api/use-create-accounts'

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount()
  const mutation = useCreateAccounts()

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
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions
          </SheetDescription>
        </SheetHeader>
        <FormAccount
          onSubmit={onSubmit}
          onDelete={onDelete}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  )
}
