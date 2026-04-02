'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useTranslations } from 'next-intl'
import { submitQuoteForm, type FormState } from '@/app/actions/quote'

interface Props {
  equipmentTitle?: string
}

const INITIAL_STATE: FormState = { status: 'idle' }

export default function QuoteSection({ equipmentTitle }: Props) {
  const t = useTranslations('quote')
  const [state, action] = useFormState(submitQuoteForm, INITIAL_STATE)

  return (
    <section className="relative overflow-hidden" id="quote">
      <div className="bg-gradient-to-br from-ws-red-dark via-ws-red to-ws-red-light grain">
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-24 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t('heading')}
          </h2>
          <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">{t('body')}</p>

          <div className="mt-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 lg:p-8 max-w-3xl mx-auto text-left">

            {/* ── Success State ─────────────────────────────────────────── */}
            {state.status === 'success' ? (
              <SuccessBanner message={state.message} t={t} />
            ) : (
              <>
                {/* ── Error banner (non-field error) ───────────────────── */}
                {state.status === 'error' && !state.fields && (
                  <div className="mb-5 flex items-start gap-3 bg-white/10 border border-white/20 rounded-xl p-4">
                    <svg className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <p className="text-white/90 text-sm">{state.message}</p>
                  </div>
                )}

                <form action={action}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      name="name"
                      type="text"
                      placeholder={t('namePlaceholder')}
                      required
                      error={state.status === 'error' ? state.fields?.name : undefined}
                    />
                    <Field
                      name="email"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      required
                      error={state.status === 'error' ? state.fields?.email : undefined}
                    />
                    <Field
                      name="company"
                      type="text"
                      placeholder={t('companyPlaceholder')}
                    />

                    {/* Equipment Interest select */}
                    <div>
                      <select
                        name="interest"
                        defaultValue={equipmentTitle ?? ''}
                        className={`w-full rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50 transition ${
                          state.status === 'error' && state.fields?.interest
                            ? 'bg-red-50/90 text-steel-800 border-2 border-red-300'
                            : 'bg-white/90 text-steel-600'
                        }`}
                      >
                        <option value="" disabled>{t('interestPlaceholder')}</option>
                        <option>{t('interestNewForklifts')}</option>
                        <option>{t('interestUsedForklifts')}</option>
                        <option>{t('interestReachTrucks')}</option>
                        <option>{t('interestPalletJacks')}</option>
                        <option>{t('interestScissorBoom')}</option>
                        <option>{t('interestParts')}</option>
                        <option>{t('interestService')}</option>
                        <option>{t('interestRental')}</option>
                        {equipmentTitle && (
                          <option value={equipmentTitle}>{equipmentTitle}</option>
                        )}
                      </select>
                      {state.status === 'error' && state.fields?.interest && (
                        <FieldError message={state.fields.interest} light />
                      )}
                    </div>

                    {/* Message textarea spans full width */}
                    <div className="sm:col-span-2">
                      <textarea
                        name="message"
                        rows={3}
                        placeholder={t('messagePlaceholder')}
                        className="w-full bg-white/90 text-steel-800 placeholder-steel-400 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                      />
                    </div>
                  </div>

                  {/* Inline field validation summary */}
                  {state.status === 'error' && state.fields && (
                    <p className="mt-3 text-white/80 text-xs">{state.message}</p>
                  )}

                  <SubmitButton t={t} />

                  {/* Alternative contact methods */}
                  {/* Alternative contact methods */}
                  <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-white/60 text-sm">
                    <a
                      href="sms:+16042292988"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <IMessageIcon /> iMessage
                    </a>
                    <span className="hidden sm:inline text-white/30">·</span>
                    <a
                      href="https://wa.me/16042292988"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <WhatsAppIcon /> WhatsApp
                    </a>
                    <span className="hidden sm:inline text-white/30">·</span>
                    <a href="tel:+16042292988" className="hover:text-white transition-colors">
                      +1 (604) 229-2988
                    </a>
                    <span className="hidden sm:inline text-white/30">·</span>
                    <a href="mailto:sales@wanshing.com" className="hover:text-white transition-colors">
                      sales@wanshing.com
                    </a>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({
  name,
  type,
  placeholder,
  required,
  error,
}: {
  name: string
  type: string
  placeholder: string
  required?: boolean
  error?: string
}) {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-lg px-4 py-3 text-sm font-medium placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition ${
          error
            ? 'bg-red-50/90 text-steel-800 border-2 border-red-300'
            : 'bg-white/90 text-steel-800'
        }`}
      />
      {error && <FieldError message={error} light />}
    </div>
  )
}

function FieldError({ message, light }: { message: string; light?: boolean }) {
  return (
    <p className={`mt-1.5 text-xs font-medium ${light ? 'text-white/80' : 'text-red-600'}`}>
      {message}
    </p>
  )
}

function SubmitButton({ t }: { t: ReturnType<typeof useTranslations<'quote'>> }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-shine mt-5 w-full inline-flex items-center justify-center gap-2 bg-steel-900 hover:bg-steel-800 disabled:bg-steel-700 disabled:cursor-not-allowed text-white font-display font-semibold px-8 py-4 rounded-xl transition-all shadow-xl text-base"
    >
      {pending ? (
        <>
          <SpinnerIcon />
          {t('submitPending')}
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          {t('submitIdle')}
        </>
      )}
    </button>
  )
}

function SuccessBanner({
  message,
  t,
}: {
  message: string
  t: ReturnType<typeof useTranslations<'quote'>>
}) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-green-400/20 border-2 border-green-400 flex items-center justify-center mx-auto mb-5">
        <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h3 className="font-display text-xl font-bold text-white mb-3">{t('successHeading')}</h3>
      <p className="text-white/80 text-sm leading-relaxed max-w-sm mx-auto mb-6">{message}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="/equipment"
          className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition"
        >
          {t('browseMore')}
        </a>
        <a
          href="tel:+16042292988"
          className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition"
        >
          {t('callNow')}
        </a>
      </div>
    </div>
  )
}

function SpinnerIcon() {
  return (
    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  )
}

function IMessageIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.406 5.51 3.6 7.24L4.5 22l3.818-1.85C9.39 20.68 10.67 21 12 21c5.523 0 10-4.144 10-9.757C22 6.145 17.523 2 12 2zm1 13.5H7v-1.5h6v1.5zm3-3H7v-1.5h9V12zm0-3H7V7.5h9V9z"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
    </svg>
  )
}