import { createCookie, redirect } from '@remix-run/node'
import bcrypt from 'bcryptjs'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import { users } from '../db/schema'

const authCookie = createCookie('auth', {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  secrets: ['s3cr3t'], // In production, this should be an env var
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7, // 1 week
})

export async function login(email: string, password: string, db: ReturnType<typeof drizzle>, env?: any) {
  // Check environment variable admin credentials first
  const adminEmail = env?.ADMIN_EMAIL
  const adminPassword = env?.ADMIN_PASSWORD

  if (adminEmail && adminPassword && email === adminEmail && password === adminPassword) {
    return {
      success: true,
      headers: {
        'Set-Cookie': await authCookie.serialize({
          userId: '00000000-0000-0000-0000-000000000000', // Special ID for env admin
          email: adminEmail,
          name: 'システム管理者 (Env)',
          isAdmin: true
        }),
      },
    }
  }

  const user = await db.select().from(users).where(eq(users.email, email)).get()

  if (!user) {
    return { success: false, error: 'ユーザーが見つかりません' }
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash)

  if (!isValidPassword) {
    return { success: false, error: 'パスワードが正しくありません' }
  }

  return {
    success: true,
    headers: {
      'Set-Cookie': await authCookie.serialize({
        userId: user.id,
        email: user.email,
        name: user.name,
        isAdmin: !!user.isAdmin
      }),
    },
  }
}

export async function logout() {
  return {
    headers: {
      'Set-Cookie': await authCookie.serialize('', { maxAge: 0 }),
    },
  }
}

export async function requireAuth(request: Request) {
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await authCookie.parse(cookieHeader)) || {}

  if (!cookie.userId) {
    throw redirect('/community')
  }
  return cookie
}

export async function getCurrentUser(request: Request) {
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await authCookie.parse(cookieHeader)) || {}
  return cookie.userId ? cookie : null
}

export async function isAuthenticated(request: Request) {
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await authCookie.parse(cookieHeader)) || {}
  return !!cookie.userId
}

// Helper function to hash passwords (for seeding/registration)
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}
