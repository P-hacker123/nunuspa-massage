'use client'

import { useEffect, useState } from 'react'
import { messageService, supabase } from '@/lib/supabase'
import { Message } from '@/types'
import { MessageSquare, Trash2, Mail, CheckCircle, Clock } from 'lucide-react'

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadMessages()
        const channel = supabase
            .channel('messages-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, () => {
                loadMessages()
            })
            .subscribe()
        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const loadMessages = async () => {
        try {
            const data = await messageService.getAll()
            setMessages(data)
        } catch (error) {
            console.error('Failed to load messages:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const toggleRead = async (id: string, currentStatus: boolean) => {
        try {
            if (!currentStatus) {
                await messageService.markAsRead(id)
            }
            loadMessages()
        } catch (error) {
            console.error('Failed to update message:', error)
        }
    }

    const deleteMessage = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return
        try {
            await messageService.delete(id)
            loadMessages()
        } catch (error) {
            console.error('Failed to delete message:', error)
        }
    }

    const unreadCount = messages.filter((m) => !m.is_read).length

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-spa-gray-900 mb-2">Messages</h1>
                    <p className="text-spa-gray-600">
                        Customer inquiries {unreadCount > 0 && <span className="text-spa-green-600 font-semibold">({unreadCount} unread)</span>}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {messages.length === 0 && !isLoading ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-spa-gray-100">
                        <MessageSquare className="w-16 h-16 text-spa-gray-300 mx-auto mb-4" />
                        <p className="text-spa-gray-500">No messages yet</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`bg-white rounded-2xl p-6 shadow-md border transition-all hover:shadow-lg ${!message.is_read ? 'border-l-4 border-l-spa-green-500 border-y-spa-gray-100 border-r-spa-gray-100' : 'border-spa-gray-100'
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${!message.is_read ? 'bg-spa-green-100 text-spa-green-600' : 'bg-spa-gray-100 text-spa-gray-500'
                                        }`}>
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-bold text-spa-gray-900">{message.name}</h3>
                                            {!message.is_read && (
                                                <span className="px-2 py-0.5 bg-spa-green-100 text-spa-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-spa-green-600 rounded-full animate-pulse" />
                                                    New
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-spa-green-600 font-medium mb-3">{message.email}</p>
                                        <p className="text-spa-gray-700 leading-relaxed bg-spa-gray-50 p-4 rounded-xl">
                                            {message.message}
                                        </p>
                                        <div className="flex items-center gap-2 mt-3 text-xs text-spa-gray-400">
                                            <Clock className="w-3 h-3" />
                                            {message.created_at && new Date(message.created_at).toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 ml-4">
                                    {!message.is_read && (
                                        <button
                                            onClick={() => toggleRead(message.id!, message.is_read!)}
                                            className="p-2 text-spa-green-600 hover:bg-spa-green-50 rounded-lg transition-colors"
                                            title="Mark as read"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteMessage(message.id!)}
                                        className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                                        title="Delete message"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
