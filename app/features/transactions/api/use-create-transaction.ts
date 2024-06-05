import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType } from 'hono'
import { InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.transactions.$post>
type RequestType = InferRequestType<
  typeof client.api.transactions.$post
>['json']

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      const response = await client.api.transactions.$post({ json })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Create Transaction.')
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
    onError: () => {
      toast.error('Failed to create Transaction!')
    }
  })
  return mutation
}
