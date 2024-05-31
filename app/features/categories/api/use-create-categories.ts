import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType } from 'hono'
import { InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.categories.$post>
type RequestType = InferRequestType<typeof client.api.categories.$post>['json']

export const useCreateCategories = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      const response = await client.api.categories.$post({ json })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Create Category.')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: () => {
      toast.error('Failed to create Category!')
    }
  })
  return mutation
}
