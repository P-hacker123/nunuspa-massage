import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for database operations
export const bookingService = {
    async create(booking: any) {
        const { data, error } = await supabase
            .from('bookings')
            .insert([booking])
            .select()

        if (error) throw error
        return data[0]
    },

    async getAll() {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    },

    async updateStatus(id: string, status: string) {
        const { data, error } = await supabase
            .from('bookings')
            .update({ status })
            .eq('id', id)
            .select()

        if (error) throw error
        return data[0]
    },

    async delete(id: string) {
        const { error } = await supabase
            .from('bookings')
            .delete()
            .eq('id', id)

        if (error) throw error
    },
}

export const messageService = {
    async create(message: any) {
        const { data, error } = await supabase
            .from('messages')
            .insert([message])
            .select()

        if (error) throw error
        return data[0]
    },

    async getAll() {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    },

    async markAsRead(id: string) {
        const { data, error } = await supabase
            .from('messages')
            .update({ is_read: true })
            .eq('id', id)
            .select()

        if (error) throw error
        return data[0]
    },

    async delete(id: string) {
        const { error } = await supabase
            .from('messages')
            .delete()
            .eq('id', id)

        if (error) throw error
    },
}

export const settingsService = {
    async get() {
        const { data, error } = await supabase
            .from('settings')
            .select('*')
            .single()

        if (error) throw error
        return data
    },

    async update(settings: any) {
        const { data, error } = await supabase
            .from('settings')
            .upsert(settings)
            .select()

        if (error) throw error
        return data[0]
    },
}

export const servicesService = {
    async create(service: any) {
        const { data, error } = await supabase
            .from('services')
            .insert([service])
            .select()

        if (error) throw error
        return data[0]
    },

    async getAll() {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: true })

        if (error) throw error
        return data
    },

    async update(id: string, service: any) {
        const { data, error } = await supabase
            .from('services')
            .update(service)
            .eq('id', id)
            .select()

        if (error) throw error
        return data[0]
    },

    async delete(id: string) {
        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id)

        if (error) throw error
    },
}

export const teamService = {
    async create(member: any) {
        const { data, error } = await supabase
            .from('team_members')
            .insert([member])
            .select()

        if (error) throw error
        return data[0]
    },

    async getAll() {
        const { data, error } = await supabase
            .from('team_members')
            .select('*')
            .order('created_at', { ascending: true })

        if (error) throw error
        return data
    },

    async update(id: string, member: any) {
        const { data, error } = await supabase
            .from('team_members')
            .update(member)
            .eq('id', id)
            .select()

        if (error) throw error
        return data[0]
    },

    async delete(id: string) {
        const { error } = await supabase
            .from('team_members')
            .delete()
            .eq('id', id)

        if (error) throw error
    },
}
