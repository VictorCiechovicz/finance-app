import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType } from 'hono'
import { InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.transactions)['transactions-create']['$post']
>
type RequestType = InferRequestType<
  (typeof client.api.transactions)['transactions-create']['$post']
>['json']

export const useCreateTransactions = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      const response = await client.api.transactions['transactions-create'][
        '$post'
      ]({
        json
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Create transaction.')
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
    onError: () => {
      toast.error('Failed to create transaction!')
    }
  })
  return mutation
}
