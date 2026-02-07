export interface Service {
    id: string
    name: string
    price: number
    description: string
    duration?: string
    image_url?: string
}

export interface Booking {
    id?: string
    full_name: string
    phone_number: string
    service_type: string
    preferred_date: string
    preferred_time: string
    status?: 'pending' | 'confirmed' | 'completed'
    created_at?: string
}

export interface Message {
    id?: string
    name: string
    email: string
    message: string
    is_read?: boolean
    created_at?: string
}

export interface Settings {
    id?: string
    phone_number: string
    maps_embed_url: string
    updated_at?: string
}

export interface TeamMember {
    id: string
    name: string
    role: string
    bio: string
    image_url?: string
    created_at?: string
}
