/**
 * Email templates — WanShing Machinery
 *
 * Two templates:
 *  1. internalInquiryEmail  → sent to sales@wanshing.com when a quote is submitted
 *  2. customerConfirmEmail  → auto-reply sent to the customer
 *
 * Both are plain HTML strings; Resend renders them server-side.
 * Brand colors are inlined for maximum email client compatibility.
 */

export interface QuoteFormData {
  name:     string
  email:    string
  company?: string
  interest: string
  message?: string
}

// ─── Shared style constants ───────────────────────────────────────────────────
const RED    = '#C8102E'
const DARK   = '#0F172A'
const BODY   = '#F8FAFC'
const TEXT   = '#1E293B'
const MUTED  = '#64748B'
const BORDER = '#E2E8F0'
const WHITE  = '#FFFFFF'

const base = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WanShing Machinery</title>
</head>
<body style="margin:0;padding:0;background:${BODY};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:${TEXT};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BODY};padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:${DARK};border-radius:12px 12px 0 0;padding:28px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:${RED};border-radius:8px;width:40px;height:40px;text-align:center;vertical-align:middle;">
                          <span style="font-family:'Helvetica Neue',sans-serif;font-weight:700;color:${WHITE};font-size:20px;line-height:40px;">W</span>
                        </td>
                        <td style="padding-left:12px;">
                          <div style="font-weight:700;color:${WHITE};font-size:18px;letter-spacing:-0.3px;">WanShing</div>
                          <div style="color:#94A3B8;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;">Machinery</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:${WHITE};padding:36px;border-left:1px solid ${BORDER};border-right:1px solid ${BORDER};">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${BODY};border:1px solid ${BORDER};border-top:none;border-radius:0 0 12px 12px;padding:20px 36px;text-align:center;">
              <p style="margin:0;font-size:12px;color:${MUTED};">
                WanShing Machinery &nbsp;·&nbsp; Vancouver & Edmonton
                <br>
                <a href="mailto:sales@wanshing.com" style="color:${RED};text-decoration:none;">sales@wanshing.com</a>
                &nbsp;·&nbsp;
                <a href="tel:+16042292988" style="color:${MUTED};text-decoration:none;">+1 (604) 229-2988</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

// ─── 1. Internal inquiry email → sales@wanshing.com ──────────────────────────
export function internalInquiryEmail(data: QuoteFormData): { subject: string; html: string } {
  const subject = `New Quote Request — ${data.interest} (${data.name}${data.company ? `, ${data.company}` : ''})`

  const row = (label: string, value: string) =>
    value
      ? `<tr>
           <td style="padding:10px 0;border-bottom:1px solid ${BORDER};width:140px;vertical-align:top;">
             <span style="font-size:12px;font-weight:600;color:${MUTED};text-transform:uppercase;letter-spacing:0.05em;">${label}</span>
           </td>
           <td style="padding:10px 0 10px 16px;border-bottom:1px solid ${BORDER};vertical-align:top;">
             <span style="font-size:14px;color:${TEXT};">${value}</span>
           </td>
         </tr>`
      : ''

  const content = `
    <div style="display:inline-block;background:${RED};color:${WHITE};font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;border-radius:20px;margin-bottom:20px;">
      New Quote Request
    </div>
    <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:${TEXT};">
      ${data.interest}
    </h1>
    <p style="margin:0 0 28px;font-size:14px;color:${MUTED};">
      Submitted ${new Date().toLocaleString('en-CA', { timeZone: 'America/Vancouver', dateStyle: 'full', timeStyle: 'short' })} PST
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BORDER};margin-bottom:28px;">
      ${row('Name',    data.name)}
      ${row('Email',   data.email)}
      ${row('Company', data.company ?? '')}
      ${row('Interest',data.interest)}
    </table>

    ${data.message ? `
    <div style="background:${BODY};border-left:3px solid ${RED};border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:${MUTED};text-transform:uppercase;letter-spacing:0.05em;">Message</p>
      <p style="margin:0;font-size:14px;color:${TEXT};line-height:1.6;white-space:pre-wrap;">${data.message}</p>
    </div>
    ` : ''}

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a href="mailto:${data.email}?subject=Re: Your WanShing Machinery Inquiry"
             style="display:inline-block;background:${RED};color:${WHITE};font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">
            Reply to ${data.name.split(' ')[0]}
          </a>
        </td>
      </tr>
    </table>
  `

  return { subject, html: base(content) }
}

// ─── 2. Customer confirmation email → customer ────────────────────────────────
export function customerConfirmEmail(data: QuoteFormData): { subject: string; html: string } {
  const subject = `We received your inquiry — WanShing Machinery`

  const content = `
    <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:${TEXT};">
      Thanks, ${data.name.split(' ')[0]}. We&rsquo;ll be in touch shortly.
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:${MUTED};line-height:1.6;">
      Your inquiry has been received by our sales team. We typically respond within
      <strong style="color:${TEXT};">24 business hours</strong> with a detailed proposal
      including pricing, availability, and delivery timeline.
    </p>

    <!-- Summary box -->
    <div style="background:${BODY};border:1px solid ${BORDER};border-radius:10px;padding:20px 24px;margin-bottom:28px;">
      <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:${MUTED};text-transform:uppercase;letter-spacing:0.08em;">
        Your Inquiry Summary
      </p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-size:13px;color:${MUTED};padding:5px 0;width:110px;">Equipment</td>
          <td style="font-size:13px;color:${TEXT};font-weight:600;padding:5px 0;">${data.interest}</td>
        </tr>
        ${data.company ? `
        <tr>
          <td style="font-size:13px;color:${MUTED};padding:5px 0;">Company</td>
          <td style="font-size:13px;color:${TEXT};padding:5px 0;">${data.company}</td>
        </tr>` : ''}
      </table>
    </div>

    <!-- Contact options -->
    <p style="margin:0 0 16px;font-size:14px;color:${TEXT};font-weight:600;">
      Need a faster response?
    </p>
    <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="padding-right:12px;">
          <a href="tel:+16042292988"
             style="display:inline-block;background:${WHITE};border:1px solid ${BORDER};color:${TEXT};font-size:13px;font-weight:600;padding:10px 18px;border-radius:8px;text-decoration:none;">
            📞 +1 (604) 229-2988
          </a>
        </td>
        <td>
          <a href="https://wa.me/16042292988"
             style="display:inline-block;background:${WHITE};border:1px solid ${BORDER};color:${TEXT};font-size:13px;font-weight:600;padding:10px 18px;border-radius:8px;text-decoration:none;">
            💬 WhatsApp
          </a>
        </td>
      </tr>
    </table>

    <div style="border-top:1px solid ${BORDER};padding-top:20px;">
      <p style="margin:0;font-size:13px;color:${MUTED};line-height:1.6;">
        <strong style="color:${TEXT};">Business Hours:</strong> Mon – Sat: 8:00 AM – 6:00 PM (PST)
        <br>
        Questions? Email <a href="mailto:sales@wanshing.com" style="color:${RED};text-decoration:none;">sales@wanshing.com</a>
      </p>
    </div>
  `

  return { subject, html: base(content) }
}