'use client'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'

interface ConfirmModalProps {
  title: string
  description: string
  openModalConfirm: boolean
  setOpenModalConfirm: (value: boolean) => void
  handleSubmit: () => void
}
export function ConfirmModal({
  title,
  description,
  openModalConfirm,
  setOpenModalConfirm,
  handleSubmit
}: ConfirmModalProps) {
  return (
    <Dialog open={openModalConfirm} onOpenChange={setOpenModalConfirm}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <Button
            variant="secondary"
            onClick={() => setOpenModalConfirm(false)}
          >
            Cancel
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
