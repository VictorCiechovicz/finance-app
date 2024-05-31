import { useForm } from 'react-hook-form'
import { insertCategorySchema } from '@/db/schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

const formSchema = insertCategorySchema.pick({
  name: true
})

export type FormValues = z.input<typeof formSchema>

export type FormCategoryProps = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (values: FormValues) => void
  onDelete: () => void
  disabled?: boolean
}

export const FormCategory = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled
}: FormCategoryProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  const handleSubmit = (value: FormValues) => {
    onSubmit(value)
  }

  const handleDelete = () => {
    onDelete()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g Food, Travel, etc"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? 'Save Changes' : 'Create Category'}
        </Button>
        {id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Delete Category
          </Button>
        )}
      </form>
    </Form>
  )
}
