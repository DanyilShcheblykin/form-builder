import { prisma } from '@/lib/prisma'
import { FormBuilderData } from '@/types/form-builder'

/**
 * Form service - business logic for forms
 * All database operations related to forms should go here
 */

export interface CreateFormData {
  name: string
  description?: string
  form_data: FormBuilderData
}

export interface UpdateFormData {
  name?: string
  description?: string
  form_data?: FormBuilderData
}

export const formService = {
  /**
   * Get all forms
   */
  async getAll() {
    return prisma.form.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
  },

  /**
   * Get form by ID
   */
  async getById(id: string) {
    return prisma.form.findUnique({
      where: { id },
      include: {
        submissions: {
          orderBy: {
            submitted_at: 'desc',
          },
        },
      },
    })
  },

  /**
   * Create a new form
   */
  async create(data: CreateFormData) {
    return prisma.form.create({
      data: {
        name: data.name,
        description: data.description || null,
        form_data: data.form_data as any,
      },
    })
  },

  /**
   * Update form by ID
   */
  async update(id: string, data: UpdateFormData) {
    const updateData: any = {}
    if (data.name !== undefined) updateData.name = data.name
    if (data.description !== undefined) updateData.description = data.description || null
    if (data.form_data !== undefined) updateData.form_data = data.form_data

    return prisma.form.update({
      where: { id },
      data: updateData,
    })
  },

  /**
   * Delete form by ID
   */
  async delete(id: string) {
    return prisma.form.delete({
      where: { id },
    })
  },

  /**
   * Check if form exists
   */
  async exists(id: string): Promise<boolean> {
    const form = await prisma.form.findUnique({
      where: { id },
      select: { id: true },
    })
    return !!form
  },
}

