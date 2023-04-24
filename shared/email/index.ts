import * as nodemailer from 'nodemailer'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EMAIL_HOST: string
      EMAIL_PORT: string
      EMAIL_USER: string
      EMAIL_PASS: string
    }
  }
}

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})
