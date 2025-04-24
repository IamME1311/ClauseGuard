import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers' // <-- Use Next.js server cookies

export const supabaseServer = () => {
  const cookieStore = cookies() // <-- Correct server-side method
  
  return createServerComponentClient({
    cookies: () => cookieStore
  })
}
