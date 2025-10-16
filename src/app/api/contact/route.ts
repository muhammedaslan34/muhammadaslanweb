import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import ContactFormEmail from '@/emails/contact-form-email'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, budget, timeline, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'hello@example.com',
      subject: `New Project Inquiry from ${name}`,
      replyTo: email,
      react: ContactFormEmail({
        name,
        email,
        budget,
        timeline,
        message,
      }),
    })

    if (error) {
      console.error('Error sending email:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    // Send confirmation email to the sender
    if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: email,
        subject: 'Thank you for your inquiry!',
        replyTo: process.env.CONTACT_EMAIL || 'hello@example.com',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333;">Thank you for your inquiry!</h2>
            <p style="color: #666; line-height: 1.6;">Hi ${name},</p>
            <p style="color: #666; line-height: 1.6;">
              I've received your project inquiry and will get back to you within 24 hours.
              In the meantime, feel free to browse my portfolio for more examples of my work.
            </p>
            <p style="color: #666; line-height: 1.6;">Best regards,<br/>Muhammad Aslan</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="color: #3b82f6; text-decoration: none;">
                Visit my website
              </a>
            </div>
          </div>
        `,
      })
    }

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}