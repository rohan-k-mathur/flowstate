'use client'

import { useState } from 'react'
import SidebarLayout from '@/components/layouts/sidebar-layout'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import AddConnectionForm from '@/components/add-connection-form'
import { useApps } from '@/hooks/use-apps'
import { useConnections } from '@/hooks/use-connections'

function ConnectionsList({
  appKey,
  onRefresh,
}: {
  appKey: string
  onRefresh: () => void
}) {
  const { connections, isLoading } = useConnections(appKey)
  const handleDelete = async (id: string) => {
    await fetch(`/api/connections/${id}`, { method: 'DELETE' })
    onRefresh()
  }
  return (
    <div className='space-y-2'>
      {isLoading && <p>Loading...</p>}
      {!isLoading &&
        connections?.map((c) => (
          <div key={c.id} className='flex items-center justify-between'>
            <span>{c.name || c.id}</span>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => handleDelete(c.id)}
            >
              Delete
            </Button>
          </div>
        ))}
    </div>
  )
}

export default function AppsPage() {
  const { apps, isLoading } = useApps()
  const [selected, setSelected] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [refresh, setRefresh] = useState(0)

  const refreshConnections = () => setRefresh((r) => r + 1)

  return (
    <SidebarLayout>
      <div className='flex h-full p-4 gap-8'>
        <div className='w-64 space-y-2'>
          <h2 className='font-semibold'>Apps</h2>
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            apps?.map((app) => (
              <Button
                key={app.key}
                variant={selected === app.key ? 'secondary' : 'outline'}
                className='w-full justify-start'
                onClick={() => setSelected(app.key)}
              >
                {app.name}
              </Button>
            ))}
        </div>
        {selected && (
          <div className='flex-1 space-y-4'>
            <div className='flex items-center justify-between'>
              <h2 className='font-semibold'>Connections</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size='sm'>Add connection</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Connection</DialogTitle>
                  </DialogHeader>
                  <AddConnectionForm
                    appKey={selected}
                    onSuccess={() => {
                      setDialogOpen(false)
                      refreshConnections()
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <ConnectionsList
              key={refresh}
              appKey={selected}
              onRefresh={refreshConnections}
            />
          </div>
        )}
      </div>
    </SidebarLayout>
  )
}
