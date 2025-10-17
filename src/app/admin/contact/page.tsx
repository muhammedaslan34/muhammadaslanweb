"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Calendar, Eye, Archive, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "unread" | "read" | "archived"
  createdAt: string
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for now - in real implementation, fetch from API
    const mockMessages: ContactMessage[] = []
    setMessages(mockMessages)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <p className="text-muted-foreground">
          Manage contact form submissions and inquiries
        </p>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground text-center">
              Contact form submissions will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <Card key={message.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{message.subject}</CardTitle>
                    <CardDescription>
                      From: {message.name} ({message.email})
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={message.status === "unread" ? "default" : "secondary"}>
                      {message.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{message.message}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(message.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Archive className="h-4 w-4 mr-1" />
                      Archive
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}