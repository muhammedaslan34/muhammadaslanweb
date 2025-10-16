import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
  Font,
} from "@react-email/components"

interface ContactFormEmailProps {
  name: string
  email: string
  budget: string
  timeline: string
  message: string
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export default function ContactFormEmail({
  name,
  email,
  budget,
  timeline,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>New project inquiry from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Heading style={logo}>Muhammad Aslan</Heading>
            <Text style={tagline}>Web Development & Design</Text>
          </Section>
          
          <Section style={contentContainer}>
            <Heading style={heading}>New Project Inquiry</Heading>
            <Text style={paragraph}>You've received a new project inquiry through your website.</Text>
            
            <Section style={detailsContainer}>
              <Hr style={hr} />
              <Text style={detailTitle}>Contact Details:</Text>
              <Text style={detailText}><strong>Name:</strong> {name}</Text>
              <Text style={detailText}><strong>Email:</strong> {email}</Text>
              <Text style={detailText}><strong>Budget Range:</strong> {budget || "Not specified"}</Text>
              <Text style={detailText}><strong>Timeline:</strong> {timeline || "Not specified"}</Text>
              <Hr style={hr} />
            </Section>
            
            <Section style={messageContainer}>
              <Text style={detailTitle}>Project Details:</Text>
              <Text style={messageText}>{message}</Text>
            </Section>
            
            <Section style={buttonContainer}>
              <Button style={button} href={`mailto:${email}`}>
                Reply to {name}
              </Button>
            </Section>
          </Section>
          
          <Section style={footerContainer}>
            <Hr style={hr} />
            <Text style={footerText}>
              This email was sent from your portfolio website contact form.
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} Muhammad Aslan. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Inter, sans-serif",
}

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#ffffff",
}

const logoContainer = {
  textAlign: "center" as const,
  marginBottom: "40px",
}

const logo = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#0f172a",
  margin: "0",
}

const tagline = {
  fontSize: "16px",
  color: "#64748b",
  margin: "8px 0 0 0",
}

const contentContainer = {
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
  padding: "32px",
  marginBottom: "32px",
}

const heading = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#0f172a",
  margin: "0 0 16px 0",
}

const paragraph = {
  fontSize: "16px",
  color: "#475569",
  margin: "0 0 24px 0",
  lineHeight: "1.6",
}

const detailsContainer = {
  margin: "24px 0",
}

const detailTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#0f172a",
  margin: "0 0 12px 0",
}

const detailText = {
  fontSize: "16px",
  color: "#475569",
  margin: "0 0 8px 0",
  lineHeight: "1.6",
}

const messageContainer = {
  margin: "24px 0",
}

const messageText = {
  fontSize: "16px",
  color: "#475569",
  margin: "0",
  lineHeight: "1.6",
  whiteSpace: "pre-wrap" as const,
}

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0 0 0",
}

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "500",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "12px 24px",
  display: "inline-block",
}

const hr = {
  border: "none",
  borderTop: "1px solid #e2e8f0",
  margin: "24px 0",
}

const footerContainer = {
  textAlign: "center" as const,
}

const footerText = {
  fontSize: "14px",
  color: "#94a3b8",
  margin: "8px 0",
  lineHeight: "1.5",
}