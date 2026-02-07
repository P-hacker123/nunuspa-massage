import { Service } from '@/types'

export const SERVICES: Service[] = [
    {
        id: 'deep-tissue',
        name: 'Deep Tissue Massage',
        price: 40000,
        description: 'Targets chronic tension in muscles that lie far below the surface. Perfect for relieving stubborn knots.',
        duration: '60 min',
    },
    {
        id: 'swedish',
        name: 'Swedish Massage',
        price: 35000,
        description: 'A gentle, relaxing massage that uses long strokes to ease tension and promote relaxation.',
        duration: '60 min',
    },
    {
        id: 'sports',
        name: 'Sports Massage',
        price: 50000,
        description: 'Designed for athletes and active individuals to prevent injury and enhance performance.',
        duration: '75 min',
    },
    {
        id: 'aromatherapy',
        name: 'Aroma Therapy',
        price: 40000,
        description: 'Uses essential oils to promote relaxation, reduce stress, and enhance overall well-being.',
        duration: '60 min',
    },
    {
        id: 'hot-stone',
        name: 'Hot Stone Massage',
        price: 50000,
        description: 'Heated stones melt away tension and stress, creating deep relaxation and healing.',
        duration: '75 min',
    },
    {
        id: 'lomi-lomi',
        name: 'Lomi Lomi Massage',
        price: 40000,
        description: 'Traditional Hawaiian massage using flowing, dance-like movements to nurture body and spirit.',
        duration: '60 min',
    },
    {
        id: 'head',
        name: 'Head Massage',
        price: 15000,
        description: 'Focused relief for headaches, stress, and tension in the head, neck, and shoulders.',
        duration: '30 min',
    },
    {
        id: 'back',
        name: 'Back Massage',
        price: 20000,
        description: 'Concentrated attention to melt away back pain and tension.',
        duration: '30 min',
    },
    {
        id: 'body-scrub',
        name: 'Body Scrub',
        price: 25000,
        description: 'Exfoliates and polishes skin, leaving it soft, smooth, and glowing.',
        duration: '45 min',
    },
    {
        id: 'reflexology',
        name: 'Reflexology Massage',
        price: 30000,
        description: 'Applies pressure to specific points on feet to promote healing throughout the body.',
        duration: '45 min',
    },
]

export const CONTACT = {
    phone: '+250 787 891 778',
    whatsapp: '250787891778',
    address: 'KG 526 St, Kigali',
    website: 'www.nunuspa.com',
    email: 'info@nunuspa.com',
}

export const BUSINESS_HOURS = {
    weekdays: 'Monday - Friday: 9:00 AM - 8:00 PM',
    weekends: 'Saturday - Sunday: 10:00 AM - 6:00 PM',
}
