# Security Policy

## 🛡️ Security Best Practices

### Environment Variables
- **Never commit** `.env.local` or any files containing real credentials
- Use `.env.local.example` as a template for required environment variables
- Generate strong secrets for production (e.g., `openssl rand -base64 32`)

### Database Security
- Use strong, unique passwords for database access
- Enable authentication and authorization
- Use connection strings with TLS/SSL when possible
- Limit database user permissions to only what's necessary

### NextAuth.js Security
- Use a strong, randomly generated `NEXTAUTH_SECRET`
- Configure proper callback URLs for production
- Enable session security features
- Regularly update dependencies

### API Security
- Implement rate limiting on API endpoints
- Validate and sanitize all user inputs
- Use HTTPS in production
- Implement proper error handling without exposing sensitive information

## 🔐 Environment Variables Required

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/your-database

# NextAuth.js
NEXTAUTH_SECRET=your_strong_secret_key_here
NEXTAUTH_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=your_email@yourdomain.com
CONTACT_EMAIL=your_email@yourdomain.com

# Application
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 🚨 Security Reminders

1. **Before Deployment:**
   - Review all environment variables
   - Ensure no hardcoded credentials in code
   - Update all default passwords
   - Enable HTTPS

2. **Regular Maintenance:**
   - Update dependencies regularly
   - Review security advisories
   - Monitor for suspicious activity
   - Backup data regularly

3. **Development:**
   - Use different credentials for development/production
   - Never use production secrets in development
   - Keep development databases separate from production

## 📧 Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:

1. **Do not** create a public issue
2. Send details to: [your-security-email@domain.com]
3. Include steps to reproduce the issue
4. Allow reasonable time for resolution before disclosure

Thank you for helping keep this project secure! 🙏