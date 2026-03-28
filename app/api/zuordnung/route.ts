import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function getSupabase() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options: any) { cookieStore.set({ name, value, ...options }) },
        remove(name: string, options: any) { cookieStore.set({ name, value: '', ...options }) },
      },
    }
  )
}

// Toggle Zuordnung: POST { referent_id, berufsfeld_id, checked }
export async function POST(request: NextRequest) {
  const supabase = getSupabase()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  }

  const { referent_id, berufsfeld_id, checked } = await request.json()

  if (checked) {
    const { error } = await supabase
      .from('zuordnung')
      .insert({ referent_id, berufsfeld_id })
    if (error && error.code !== '23505') { // Ignoriere Duplikate
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  } else {
    const { error } = await supabase
      .from('zuordnung')
      .delete()
      .eq('referent_id', referent_id)
      .eq('berufsfeld_id', berufsfeld_id)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
