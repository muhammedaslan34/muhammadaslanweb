"use client"

import { useMemo, useRef, useState } from "react"
import Image from "next/image"
import {
  Send,
  User,
  Mail,
  DollarSign,
  Calendar,
  MessageSquare,
  Phone,
  Search,
  ChevronsUpDown,
  Check,
} from "lucide-react"
import {
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js"
import { Button } from "@/components/ui/button"
import { CtaPrimaryInner } from "@/components/ui/cta-button-inner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const budgetRanges = [
  "$1,000 - $2,500",
  "$2,500 - $5,000", 
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000+"
]

const timelines = [
  "ASAP",
  "Within 1 month",
  "Within 3 months",
  "Within 6 months",
  "No rush"
]

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

/** PNG flags — Unicode emoji flags often show as "AE"/"AF" on Windows (no flag font). */
function countryFlagSrc(iso2: string) {
  return `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`
}

function CountryFlag({
  code,
  width = 22,
  height = 16,
  className,
}: {
  code: string
  width?: number
  height?: number
  className?: string
}) {
  return (
    <Image
      src={countryFlagSrc(code)}
      alt=""
      width={width}
      height={height}
      className={cn('shrink-0 rounded-[2px] object-cover shadow-sm', className)}
      unoptimized
      aria-hidden
    />
  )
}

const countryOptions = getCountries()
  .map((country) => ({
    code: country,
    name: regionNames.of(country) || country,
    dialCode: `+${getCountryCallingCode(country)}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "AE",
    phone: "",
    budget: "",
    timeline: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countryPickerOpen, setCountryPickerOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")
  const countrySearchRef = useRef<HTMLInputElement>(null)
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const selectedCountry = useMemo(
    () => countryOptions.find((c) => c.code === formData.countryCode) ?? countryOptions[0],
    [formData.countryCode]
  )

  const filteredCountries = useMemo(() => {
    const trimmed = countrySearch.trim().toLowerCase()
    const dialQuery = trimmed.replace(/^\+/, "")
    if (!trimmed) return countryOptions
    return countryOptions.filter(
      (c) =>
        c.name.toLowerCase().includes(trimmed) ||
        c.dialCode.replace("+", "").includes(dialQuery) ||
        c.code.toLowerCase().includes(trimmed)
    )
  }, [countrySearch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: '' })
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Thank you for your inquiry! I\'ll get back to you within 24 hours.'
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          countryCode: "AE",
          phone: "",
          budget: "",
          timeline: "",
          message: ""
        })
        setCountrySearch("")
      } else {
        setFormStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.'
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setFormStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="glass-card hover-lift">
      <CardHeader>
        <CardTitle className="text-2xl">Get Your Free Quote</CardTitle>
        <CardDescription>
          Tell me about your project and I&apos;ll provide a detailed estimate within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center">
              <User className="h-4 w-4 mr-2 text-accent" />
              Full Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Your full name"
              required
              className="glass-card"
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-accent" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
                required
                className="glass-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-accent" />
                Phone Number
              </Label>
              <div className="glass-card border-input bg-input-background focus-within:border-ring focus-within:ring-ring/50 flex h-9 w-full min-w-0 items-stretch rounded-md border transition-[color,box-shadow] focus-within:ring-[3px]">
                <Popover
                  open={countryPickerOpen}
                  onOpenChange={(open) => {
                    setCountryPickerOpen(open)
                    if (!open) setCountrySearch("")
                  }}
                >
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      aria-label="Select country"
                      className="text-foreground hover:bg-white/5 flex shrink-0 items-center gap-1.5 rounded-l-md px-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 md:px-3"
                    >
                      <CountryFlag code={selectedCountry.code} width={22} height={16} />
                      <ChevronsUpDown className="text-muted-foreground size-4 shrink-0 opacity-70" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="glass-card border-border/60 max-h-[min(320px,50vh)] overflow-hidden p-0 shadow-lg"
                    onOpenAutoFocus={(e) => {
                      e.preventDefault()
                      requestAnimationFrame(() => countrySearchRef.current?.focus())
                    }}
                  >
                    <div className="border-border/60 flex items-center gap-2 border-b px-2 py-2">
                      <Search className="text-muted-foreground size-4 shrink-0" aria-hidden />
                      <Input
                        ref={countrySearchRef}
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Search country..."
                        className="h-8 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                        autoComplete="off"
                      />
                    </div>
                    <ul
                      className="max-h-[240px] overflow-y-auto overscroll-contain p-1"
                      role="listbox"
                    >
                      {filteredCountries.length === 0 ? (
                        <li className="text-muted-foreground px-3 py-6 text-center text-sm">
                          No country found.
                        </li>
                      ) : (
                        filteredCountries.map((country) => {
                          const isSelected = country.code === formData.countryCode
                          return (
                            <li key={country.code} role="option" aria-selected={isSelected}>
                              <button
                                type="button"
                                className={cn(
                                  'hover:bg-accent/15 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors',
                                  isSelected && 'bg-accent/20'
                                )}
                                onClick={() => {
                                  setFormData({ ...formData, countryCode: country.code })
                                  setCountryPickerOpen(false)
                                  setCountrySearch("")
                                }}
                              >
                                <CountryFlag code={country.code} width={20} height={15} />
                                <span className="min-w-0 flex-1 truncate font-medium">
                                  {country.name}
                                </span>
                                <span className="text-muted-foreground shrink-0 tabular-nums">
                                  {country.dialCode}
                                </span>
                                {isSelected ? (
                                  <Check className="text-accent size-4 shrink-0" aria-hidden />
                                ) : (
                                  <span className="size-4 shrink-0" />
                                )}
                              </button>
                            </li>
                          )
                        })
                      )}
                    </ul>
                  </PopoverContent>
                </Popover>
                <div className="bg-border my-2 w-px shrink-0 self-stretch" />
                <span className="text-muted-foreground flex shrink-0 items-center px-2 text-sm tabular-nums">
                  +{getCountryCallingCode(formData.countryCode as CountryCode)}
                </span>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="placeholder:text-muted-foreground/70 h-full min-w-0 flex-1 rounded-none rounded-r-md border-0 bg-transparent py-1 pr-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  inputMode="tel"
                  autoComplete="tel-national"
                />
              </div>
            </div>
          </div>

          {/* Budget & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-accent" />
                Budget Range
              </Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                <SelectTrigger className="glass-card">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-accent" />
                Timeline
              </Label>
              <Select value={formData.timeline} onValueChange={(value) => setFormData({...formData, timeline: value})}>
                <SelectTrigger className="glass-card">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelines.map((timeline) => (
                    <SelectItem key={timeline} value={timeline}>
                      {timeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-accent" />
              Project Details
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Tell me about your project, goals, and any specific requirements..."
              rows={5}
              required
              className="glass-card"
            />
          </div>

          {/* Form Status Messages */}
          {formStatus.type && (
            <div className={`p-4 rounded-md ${
              formStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {formStatus.message}
            </div>
          )}
          
          <Button
            type="submit"
            variant="cta"
            className="w-full justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="relative z-10">Sending...</span>
            ) : (
              <CtaPrimaryInner icon={<Send className="size-4" />}>
                Send Project Details
              </CtaPrimaryInner>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
