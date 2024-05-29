import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[':id']['$delete']
>

export const useDeleteAccount = (id?: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.accounts[':id']['$delete']({
        param: { id }
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Deleted Account.')
      queryClient.invalidateQueries({ queryKey: ['accounts', { id }] })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
    onError: () => {
      toast.error('Failed to delete Account!')
    }
  })
  return mutation
}
