import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType } from 'hono'
import { InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.transactions)['transactions-delete']['$post']
>
type RequestType = InferRequestType<
  (typeof client.api.transactions)['transactions-delete']['$post']
>['json']

export const useDeleteTransactions = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      const response = await client.api.transactions['transactions-delete'][
        '$post'
      ]({
        json
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Delete transaction.')
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
    onError: () => {
      toast.error('Failed to delete transaction!')
    }
  })
  return mutation
}
