import { useRef, useState } from 'react'
import { useCreateAccounts } from '@/app/features/accounts/api/use-create-accounts'
import { useGetAccounts } from '@/app/features/accounts/api/use-get-accounts'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/Select'
export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>
] => {
  const accountQuery = useGetAccounts()
  const accountMutation = useCreateAccounts()

  const onCreateAccount = (name: string) => accountMutation.mutate({ name })
  const accountOptions = (accountQuery.data ?? []).map(account => ({
    label: account.name,
    value: account.id
  }))

  const [promisse, setPromisse] = useState<{
    resolve: (value: string | undefined) => void
  } | null>(null)

  const selectValue = useRef<string>()

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromisse({ resolve })
    })

  const handleClose = () => {
    setPromisse(null)
  }

  const handleConfirm = () => {
    promisse?.resolve(selectValue.current)
    handleClose()
  }

  const handleCancel = () => {
    promisse?.resolve(undefined)
    handleClose()
  }

  const ConfirmationDialog = () => (
    <Dialog open={promisse !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Please select account to continue.
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Select an account"
          options={accountOptions}
          onCreate={onCreateAccount}
          onChange={value => (selectValue.current = value)}
          disabled={accountQuery.isLoading || accountMutation.isPending}
        />
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>

          <Button onClick={handleConfirm}>Comfirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return [ConfirmationDialog, confirm]
}
