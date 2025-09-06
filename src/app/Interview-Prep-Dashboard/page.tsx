'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { data: session, status } = useSession()
  const userEmail = session?.user?.email
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRedirectUrl = async () => {
      if (!userEmail) return

      try {
        setIsLoading(true)
        const res = await fetch(`/api/payment/generate-link?email=${userEmail}`)
        const data = await res.json()

        if (!data.error && data.redirectUrl) {
          // open in a new tab
          // window.open(data.redirectUrl, '_blank')
          // 👉 if you want same tab instead:
          window.location.href = data.redirectUrl
        } else {
          setError(data.error || 'No redirect URL found')
        }
      } catch (err) {
        console.error('Error fetching redirect URL:', err)
        setError('Failed to fetch redirect URL')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRedirectUrl()
  }, [userEmail])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-purple-800 font-medium">Loading payment information...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full border border-purple-200">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-purple-900">Payment Setup Required</h3>
            <p className="mt-2 text-sm text-purple-700">
              We couldn't generate your payment link. Please contact our administration team for assistance.
            </p>
            <div className="mt-6 bg-purple-50 rounded-md p-4">
              <h4 className="text-sm font-medium text-purple-800 mb-2">Contact Information:</h4>
              <p className="text-sm text-purple-700">Email: Contact@Aisaathi.com</p>
              
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <div>Redirecting to payment page...</div>
}

export default Page