import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services'
import { adminKeys } from './query-keys'
import type { CreateUserDto, UpdateUserDto } from '../services'

export function useUsers() {
  return useQuery({
    queryKey: adminKeys.users.all,
    queryFn: userService.getAll,
  })
}

export function useCreateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateUserDto) => userService.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users.all }),
  })
}

export function useUpdateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateUserDto }) => userService.update(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users.all }),
  })
}

export function useDeleteUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users.all }),
  })
}
