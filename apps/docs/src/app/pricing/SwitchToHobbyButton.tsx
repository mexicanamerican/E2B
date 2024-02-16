'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { useUser } from '@/utils/useUser'
import { tiers } from '@/utils/consts'

import { TierActiveTag } from './TierActiveTag'

function SwitchToHobbyButton() {
  const { user } = useUser()
  const [url, setURL] = useState('')

  useEffect(function getBillingURL() {
    if (!user) return
    const u = `${process.env.NEXT_PUBLIC_STRIPE_BILLING_URL}?prefilled_email=${user.teams[0].email}`
    setURL(u)
  }, [user])

  // Only show the button if the user is on the base_v1 tier.
  // Teams can have custom tiers. We only want the button to users on the free tier.
  if (!user || (user.pricingTier.id !== tiers.hobby.id && user.pricingTier.id !== tiers.pro.id)) {
    return
  }

  return (
    <div className="flex flex-col items-start justify-start gap-1 my-4">
      <div className="flex items-center justify-start gap-2">
        {user.pricingTier.id === tiers.hobby.id && (
          <TierActiveTag />
        )}

        {user.pricingTier.id !== tiers.hobby.id && (
          <a href={url} target="_blank" rel="noreferrer noopener">
            <Button>Switch to {tiers.hobby.displayName}</Button>
          </a>
        )}
      </div>
    </div>
  )
}

export default SwitchToHobbyButton
