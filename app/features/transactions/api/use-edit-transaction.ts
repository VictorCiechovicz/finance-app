import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType } from 'hono'
import { InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[':id']['$patch']
>
type RequestType = InferRequestType<
  (typeof client.api.transactions)[':id']['$patch']
>['json']

export const useEditTransaction = (id?: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      const response = await client.api.transactions[':id']['$patch']({
        json,
        param: { id }
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Update Transaction.')
      queryClient.invalidateQueries({ queryKey: ['transactions', { id }] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
    onError: () => {
      toast.error('Failed to edit Transaction!')
    }
  })
  return mutation
}
