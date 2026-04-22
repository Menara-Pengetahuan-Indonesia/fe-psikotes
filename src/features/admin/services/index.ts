import { api } from '@/lib/axios'
import type {
  Package, ChildPackage, PackageType, Test, SubTest, Question,
  PublicPackage,
  ApiResponse,
  CreatePackageDto, UpdatePackageDto,
  CreateChildPackageDto, UpdateChildPackageDto,
  CreatePackageTypeDto, UpdatePackageTypeDto,
  CreateTestDto, UpdateTestDto,
  CreateSubTestDto, UpdateSubTestDto,
  CreateQuestionDto, UpdateQuestionDto,
} from '../types'

// ── PACKAGE SERVICE ─────────────────────────────────
export const packageService = {
  getAll: async (): Promise<Package[]> => {
    const { data } = await api.get<ApiResponse<Package[]>>('/admin/packages')
    return data.data
  },
  getById: async (id: string): Promise<Package> => {
    const { data } = await api.get<ApiResponse<Package>>(`/admin/packages/${id}`)
    return data.data
  },
  create: async (dto: CreatePackageDto): Promise<Package> => {
    const { data } = await api.post<ApiResponse<Package>>('/admin/packages', dto)
    return data.data
  },
  update: async (id: string, dto: UpdatePackageDto): Promise<Package> => {
    const { data } = await api.patch<ApiResponse<Package>>(`/admin/packages/${id}`, dto)
    return data.data
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/packages/${id}`)
  },
}

// ── CHILD PACKAGE SERVICE ───────────────────────────
export const childPackageService = {
  getAll: async (): Promise<ChildPackage[]> => {
    const { data } = await api.get<ApiResponse<ChildPackage[]>>('/admin/child-packages')
    return data.data
  },
  getById: async (id: string): Promise<ChildPackage> => {
    const { data } = await api.get<ApiResponse<ChildPackage>>(`/admin/child-packages/${id}`)
    return data.data
  },
  create: async (dto: CreateChildPackageDto): Promise<ChildPackage> => {
    const { data } = await api.post<ApiResponse<ChildPackage>>('/admin/child-packages', dto)
    return data.data
  },
  update: async (id: string, dto: UpdateChildPackageDto): Promise<ChildPackage> => {
    const { data } = await api.patch<ApiResponse<ChildPackage>>(`/admin/child-packages/${id}`, dto)
    return data.data
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/child-packages/${id}`)
  },
}

// ── PACKAGE TYPE SERVICE ────────────────────────────
export const packageTypeService = {
  getAll: async (): Promise<PackageType[]> => {
    const { data } = await api.get<ApiResponse<PackageType[]>>('/admin/package-types')
    return data.data
  },
  getById: async (id: string): Promise<PackageType> => {
    const { data } = await api.get<ApiResponse<PackageType>>(`/admin/package-types/${id}`)
    return data.data
  },
  create: async (dto: CreatePackageTypeDto): Promise<PackageType> => {
    const { data } = await api.post<ApiResponse<PackageType>>('/admin/package-types', dto)
    return data.data
  },
  update: async (id: string, dto: UpdatePackageTypeDto): Promise<PackageType> => {
    const { data } = await api.patch<ApiResponse<PackageType>>(`/admin/package-types/${id}`, dto)
    return data.data
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/package-types/${id}`)
  },
}

// ── TEST SERVICE ────────────────────────────────────
export const testService = {
  getAll: async (): Promise<Test[]> => {
    const { data } = await api.get<ApiResponse<Test[]>>('/admin/tests')
    return data.data
  },
  getById: async (id: string): Promise<Test> => {
    const { data } = await api.get<ApiResponse<Test>>(`/admin/tests/${id}`)
    return data.data
  },
  create: async (dto: CreateTestDto): Promise<Test> => {
    const { data } = await api.post<ApiResponse<Test>>('/admin/tests', dto)
    return data.data
  },
  update: async (id: string, dto: UpdateTestDto): Promise<Test> => {
    const { data } = await api.patch<ApiResponse<Test>>(`/admin/tests/${id}`, dto)
    return data.data
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/tests/${id}`)
  },
}

// ── SUBTEST SERVICE ─────────────────────────────────
export const subTestService = {
  getAll: async (): Promise<SubTest[]> => {
    const { data } = await api.get<ApiResponse<SubTest[]>>('/admin/subtests')
    return data.data
  },
  getById: async (id: string): Promise<SubTest> => {
    const { data } = await api.get<ApiResponse<SubTest>>(`/admin/subtests/${id}`)
    return data.data
  },
  create: async (dto: CreateSubTestDto): Promise<SubTest> => {
    const { data } = await api.post<ApiResponse<SubTest>>('/admin/subtests', dto)
    return data.data
  },
  update: async (id: string, dto: UpdateSubTestDto): Promise<SubTest> => {
    const { data } = await api.patch<ApiResponse<SubTest>>(`/admin/subtests/${id}`, dto)
    return data.data
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/subtests/${id}`)
  },
}

// ── QUESTION SERVICE ────────────────────────────────
export const questionService = {
  getAll: async (): Promise<Question[]> => {
    const { data } = await api.get<ApiResponse<Question[]>>('/admin/questions')
    return data.data
  },
  getById: async (id: string): Promise<Question> => {
    const { data } = await api.get<ApiResponse<Question>>(`/admin/questions/${id}`)
    return data.data
  },
  create: async (dto: CreateQuestionDto): Promise<Question> => {
    const { data } = await api.post<ApiResponse<Question>>('/admin/questions', dto)
    return data.data
  },
  update: async (id: string, dto: UpdateQuestionDto): Promise<Question> => {
    const { data } = await api.patch<ApiResponse<Question>>(`/admin/questions/${id}`, dto)
    return data.data
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/questions/${id}`)
  },
}

// ── UPLOAD SERVICE ──────────────────────────────────
export const uploadService = {
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await api.post<ApiResponse<{ url: string }>>(
      '/upload/image',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    return data.data
  },
}

// ── USER SERVICE ───────────────────────────────────
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  telephone?: string
  role: 'USER' | 'ADMIN' | 'SUPERADMIN'
  createdAt: string
  updatedAt: string
}

export interface CreateUserDto {
  firstName: string
  lastName: string
  email: string
  telephone?: string
  password: string
  role: 'USER' | 'ADMIN' | 'SUPERADMIN'
}

export interface UpdateUserDto {
  firstName?: string
  lastName?: string
  email?: string
  telephone?: string
  password?: string
  role?: 'USER' | 'ADMIN' | 'SUPERADMIN'
}

export const userService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get<User[] | ApiResponse<User[]>>('/users')
    return Array.isArray(data) ? data : data.data
  },
  getById: async (id: string): Promise<User> => {
    const { data } = await api.get<User | ApiResponse<User>>(`/users/${id}`)
    return (data as ApiResponse<User>).data ?? data as User
  },
  create: async (dto: CreateUserDto): Promise<User> => {
    const { data } = await api.post<User | ApiResponse<User>>('/users', dto)
    return (data as ApiResponse<User>).data ?? data as User
  },
  update: async (id: string, dto: UpdateUserDto): Promise<User> => {
    const { data } = await api.patch<User | ApiResponse<User>>(`/users/${id}`, dto)
    return (data as ApiResponse<User>).data ?? data as User
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`)
  },
}

// ── PUBLIC PACKAGE SERVICE (unauthenticated) ─────────
export const publicPackageService = {
  getAll: async (): Promise<PublicPackage[]> => {
    const { data } = await api.get<ApiResponse<PublicPackage[]>>('/packages')
    return data.data
  },
  getById: async (id: string): Promise<PublicPackage> => {
    const { data } = await api.get<ApiResponse<PublicPackage>>(`/packages/${id}`)
    return data.data
  },
}
