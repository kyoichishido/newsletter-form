'use client'

import { useState } from 'react'
import { Scroll, Send, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeToNewsletter } from './actions'
// import banner from '/banner.svg'
import Image from 'next/image'

export default function NewsletterSignup() {
  const [status, setStatus] = useState<{
    message?: string
    success?: boolean
  }>({})
  const [isPending, setIsPending] = useState(false)
  const [email, setEmail] = useState('') // Manage form state for email input

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    const result = await subscribeToNewsletter(formData);
    setStatus(result);
    setIsPending(false);

    if (result.success) {
      setEmail(''); // Clear the email input field after successful submission
    }
  }

  return (
    <div className="min-h-screen bg-[#F5E6D3] flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
      
        <div className="bg-white/80 backdrop-blur-sm rounded-lg py-5 md:py-9 px-8 md:px-12 shadow-xl border border-amber-200">
          <div className="flex justify-center mb-8">
            {/* <Scroll className="h-16 w-16 text-amber-800" /> */}
            <Image 
            className='w-auto h-auto'
            src='/banner-2.svg'
            width={150}
            height={150}
            alt='tete'
             />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif mb-4 text-amber-900">
              Shawty apna email dedo
            </h1>
            <p className="text-lg text-amber-800 font-serif">
              "In scrolls of old lie treasures untold. Join the treasure trove of dank literary vibes, deep thoughts, and questionable metaphors."
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="email"
                name="email"
                value={email} // Bind the input to the `email` state
                onChange={(e) => setEmail(e.target.value)} // Update the `email` state
                placeholder="Don’t be shy; Drop thy sacred electronic digits..."
                required
                className="w-full bg-white/50 border-amber-200 font-serif text-amber-900 placeholder:text-amber-700/50"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50 font-serif text-lg h-12"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send forth thy request
                </>
              )}
            </Button>
          </form>

          {status.message && (
            <div className={`mt-6 text-center font-serif text-lg ${
              status.success ? 'text-green-800' : 'text-red-800'
            }`}>
              {status.message}
            </div>
          )}

          <div className="mt-8 text-center text-sm text-amber-700 font-serif">
            By subscribing, you join our sacred circle of knowledge seekers. 
            We shall treat your scroll address with utmost discretion.
          </div>
        </div>
      </div>
    </div>
  )
}
