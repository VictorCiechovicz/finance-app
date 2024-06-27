import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType } from 'hono'
import { InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.categories)['categories-delete']['$post']
>
type RequestType = InferRequestType<
  (typeof client.api.categories)['categories-delete']['$post']
>['json']

export const useDeleteCategories = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      const response = await client.api.categories['categories-delete'][
        '$post'
      ]({
        json
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Delete Category.')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
    onError: () => {
      toast.error('Failed to delete Category!')
    }
  })
  return mutation
}
