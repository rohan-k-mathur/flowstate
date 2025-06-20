'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AddConnectionForm({
  appKey,
  onSuccess,
}: {
  appKey: string
  onSuccess: () => void
}) {
  const [screenName, setScreenName] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/apps/${appKey}/connections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formattedData: { screenName } }),
      })
      if (!res.ok) throw new Error('Failed to create connection')
      setScreenName('')
      onSuccess()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <Input
        placeholder='Connection name'
        value={screenName}
        onChange={(e) => setScreenName(e.target.value)}
      />
      <div className='flex justify-end'>
        <Button type='submit' disabled={loading}>
          Save
        </Button>
      </div>
    </form>
  )
}
