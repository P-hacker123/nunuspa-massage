import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Supabase Admin Client with Service Role Key
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)

export async function POST(request: Request) {
    try {
        const { email, password, role } = await request.json()

        // 1. Create the user in Supabase Auth
        const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { role: role || 'admin' }
        })

        if (userError) {
            return NextResponse.json({ error: userError.message }, { status: 400 })
        }

        return NextResponse.json({
            message: 'User created successfully',
            user: userData.user
        })

    } catch (error) {
        console.error('Create user error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(request: Request) {
    try {
        const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json(users)
    } catch (error) {
        console.error('List users error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
