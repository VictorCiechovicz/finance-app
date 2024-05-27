import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType } from 'hono'
import { InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.accounts)['accounts-delete']['$post']
>
type RequestType = InferRequestType<
  (typeof client.api.accounts)['accounts-delete']['$post']
>['json']

export const useDeleteAccounts = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      const response = await client.api.accounts['accounts-delete']['$post']({
        json
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Delete Account.')
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
    onError: () => {
      toast.error('Failed to delete Account!')
    }
  })
  return mutation
}
