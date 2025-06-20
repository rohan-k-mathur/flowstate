import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <span className="text-lg font-semibold">Flowstate</span>
        <Button asChild>
          <Link href="/">Launch App</Link>
        </Button>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="px-6 py-4 text-center text-sm text-muted-foreground space-y-1">
        <div>© 2025 Flowstate Automation, Inc.</div>
        <div>Privacy • Security • Terms</div>
        <div>careers@flowstate.ai | support@flowstate.ai</div>
      </footer>
    </div>
  );
}
