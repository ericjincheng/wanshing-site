'use server'

import { Resend } from 'resend'
import { internalInquiryEmail, customerConfirmEmail } from '@/lib/email'
import type { QuoteFormData } from '@/lib/email'

// ─── Types ────────────────────────────────────────────────────────────────────
export type FormState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error';   message: string; fields?: Partial<Record<keyof QuoteFormData, string>> }

// ─── Validation ───────────────────────────────────────────────────────────────
function validateQuoteForm(data: QuoteFormData): Partial<Record<keyof QuoteFormData, string>> | null {
  const errors: Partial<Record<keyof QuoteFormData, string>> = {}

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name.'
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!data.interest || data.interest === '') {
    errors.interest = 'Please select the equipment you are interested in.'
  }

  return Object.keys(errors).length > 0 ? errors : null
}

// ─── Server Action ────────────────────────────────────────────────────────────
export async function submitQuoteForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Extract fields
  const raw: QuoteFormData = {
    name:     String(formData.get('name')     ?? '').trim(),
    email:    String(formData.get('email')    ?? '').trim(),
    company:  String(formData.get('company')  ?? '').trim() || undefined,
    interest: String(formData.get('interest') ?? '').trim(),
    message:  String(formData.get('message')  ?? '').trim() || undefined,
  }

  // 2. Validate
  const fieldErrors = validateQuoteForm(raw)
  if (fieldErrors) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields before submitting.',
      fields: fieldErrors,
    }
  }

  // 3. Guard — RESEND_API_KEY must be set
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[quote] RESEND_API_KEY is not set.')
    return {
      status: 'error',
      message: 'Email delivery is not configured. Please call us at +1 (604) 229-2988.',
    }
  }

  const resend = new Resend(apiKey)

  const FROM_NAME    = 'WanShing Machinery'
  const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS ?? 'noreply@wanshing.com'
  const SALES_EMAIL  = process.env.SALES_EMAIL         ?? 'sales@wanshing.com'

  try {
    // 4. Send internal notification to sales team
    const { subject: internalSubject, html: internalHtml } = internalInquiryEmail(raw)
    await resend.emails.send({
      from:    `${FROM_NAME} <${FROM_ADDRESS}>`,
      to:      [SALES_EMAIL],
      replyTo: raw.email,
      subject: internalSubject,
      html:    internalHtml,
    })

    // 5. Send confirmation auto-reply to customer
    const { subject: confirmSubject, html: confirmHtml } = customerConfirmEmail(raw)
    await resend.emails.send({
      from:    `${FROM_NAME} <${FROM_ADDRESS}>`,
      to:      [raw.email],
      subject: confirmSubject,
      html:    confirmHtml,
    })

    return {
      status: 'success',
      message: `Thank you, ${raw.name.split(' ')[0]}! Your inquiry has been sent. Check your inbox — we'll be in touch within 24 hours.`,
    }
  } catch (err) {
    console.error('[quote] Resend error:', err)
    return {
      status: 'error',
      message: 'Something went wrong sending your inquiry. Please try calling us at +1 (604) 229-2988.',
    }
  }
}