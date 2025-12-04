import { prisma } from '@/lib/prisma'

/**
 * Submission service - business logic for form submissions
 */

export interface CreateSubmissionData {
  form_id: string
  submission_data: any
}

export const submissionService = {
  /**
   * Create a new submission
   */
  async create(data: CreateSubmissionData) {
    return prisma.formSubmission.create({
      data: {
        form_id: data.form_id,
        submission_data: data.submission_data as any,
      },
    })
  },

  /**
   * Get all submissions for a form
   */
  async getByFormId(formId: string) {
    return prisma.formSubmission.findMany({
      where: { form_id: formId },
      orderBy: {
        submitted_at: 'desc',
      },
    })
  },

  /**
   * Get submission by ID
   */
  async getById(id: string) {
    return prisma.formSubmission.findUnique({
      where: { id },
      include: {
        form: true,
      },
    })
  },
}

