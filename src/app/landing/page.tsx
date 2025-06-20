import { Check } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="size-4 text-primary" />
      <span>{children}</span>
    </li>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center gap-16 px-6 py-12">
      <section className="flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold">
          Automate Every Corner of Your Small Business—Without Writing a Single Line of Code
        </h1>
        <p className="text-muted-foreground">
          Flowstate turns plain‑English instructions into powerful, drag‑and‑drop workflows that connect your e‑commerce, accounting, marketing, and inventory tools—in minutes.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg">Start Free Today →</Button>
          <Button variant="outline" size="lg">Watch a 2‑Minute Demo</Button>
        </div>
      </section>

      <div className="text-sm text-muted-foreground text-center">
        Trusted by forward‑thinking sellers and retailers on Etsy, Amazon, Shopify, Whatnot, QuickBooks, and more.
      </div>

      <section className="flex w-full flex-col items-center gap-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold text-center">Why Flowstate?</h2>
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-2" />
              <th className="p-2">Flowstate</th>
              <th className="p-2">Zapier</th>
              <th className="p-2">Make (Integromat)</th>
              <th className="p-2">Microsoft Power Automate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            <tr>
              <td className="p-2 font-medium">Natural‑Language Workflow Creation</td>
              <td className="p-2">✓ (built‑in AI prompt)</td>
              <td className="p-2">&mdash;</td>
              <td className="p-2">&mdash;</td>
              <td className="p-2">&mdash;</td>
            </tr>
            <tr>
              <td className="p-2 font-medium">Visual Branching & Loops</td>
              <td className="p-2">✓ intuitive node canvas</td>
              <td className="p-2">Limited</td>
              <td className="p-2">Advanced (steep curve)</td>
              <td className="p-2">Advanced (steep curve)</td>
            </tr>
            <tr>
              <td className="p-2 font-medium">SMB‑Friendly Onboarding (guided, no jargon)</td>
              <td className="p-2">✓</td>
              <td className="p-2">Partial</td>
              <td className="p-2">✕</td>
              <td className="p-2">✕</td>
            </tr>
            <tr>
              <td className="p-2 font-medium">Real‑Time Collaboration (share + comment)</td>
              <td className="p-2">✓</td>
              <td className="p-2">✕</td>
              <td className="p-2">✕</td>
              <td className="p-2">✕</td>
            </tr>
            <tr>
              <td className="p-2 font-medium">Transparent Pricing for Small Teams</td>
              <td className="p-2">✓</td>
              <td className="p-2">Costly at scale</td>
              <td className="p-2">Complex tiers</td>
              <td className="p-2">Requires Microsoft 365</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="flex max-w-3xl flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold text-center">How It Works</h2>
        <ol className="space-y-4 text-left text-sm">
          <li>
            <strong>Describe your workflow in plain English</strong>
            <p className="text-muted-foreground">
              e.g. “When I get a new Etsy order, update inventory in Shopify and send a personalized thank‑you email.”
            </p>
          </li>
          <li>
            <strong>Watch Flowstate generate the flow</strong>
            <p className="text-muted-foreground">Our AI builds a ready‑to‑run node diagram you can tweak visually—no formulas or code.</p>
          </li>
          <li>
            <strong>Connect your apps in seconds</strong>
            <p className="text-muted-foreground">OAuth connectors for Shopify, Etsy, Amazon, QuickBooks, Gmail, Mailchimp, and Google Sheets (with more added weekly).</p>
          </li>
          <li>
            <strong>Run, monitor, relax</strong>
            <p className="text-muted-foreground">Flowstate executes every step reliably, shows live logs, and alerts you if something needs attention.</p>
          </li>
        </ol>
      </section>

      <section className="flex max-w-3xl flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold text-center">Key Features</h2>
        <ul className="space-y-2 text-left text-sm">
          <Bullet>AI Prompt‑to‑Workflow – Skip blank‑canvas anxiety; one sentence becomes an automated process.</Bullet>
          <Bullet>Drag‑and‑Drop Visual Builder – Triggers, actions, conditions, loops, delays—arrange them like digital Lego.</Bullet>
          <Bullet>50+ Pre‑Built Templates – Launch common small‑business automations (inventory sync, daily P&L email, abandoned‑cart follow‑up) in one click.</Bullet>
          <Bullet>Sandbox & One‑Click Dry‑Run – Test workflows on sample data before touching your live store.</Bullet>
          <Bullet>Real‑Time Collaboration – Share read‑only or edit links, leave comments, version history included.</Bullet>
          <Bullet>Detailed Logs & Rollback – Every run is recorded; revert changes or replay with new data.</Bullet>
          <Bullet>Usage‑Based Pricing – Pay only for what you run. Free tier includes one active workflow to prove ROI.</Bullet>
          <Bullet>Enterprise‑Grade Security – SOC‑2 roadmap, end‑to‑end encryption, least‑privilege OAuth scopes.</Bullet>
        </ul>
      </section>

      <section className="flex max-w-4xl flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold text-center">Popular Use Cases</h2>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3 text-sm">
          <div className="space-y-2">
            <h3 className="font-semibold">🛒 E‑Commerce Ops</h3>
            <ul className="space-y-1">
              <li>Sync stock across Etsy, Amazon, Shopify in real time</li>
              <li>Generate shipping labels when orders drop below 10‑min SLA</li>
              <li>Send supplier reorder when SKU &lt; 20</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">📢 Marketing & CRM</h3>
            <ul className="space-y-1">
              <li>Auto‑tag repeat customers and email loyalty coupons</li>
              <li>Build segmented Mailchimp lists from new orders</li>
              <li>Trigger personalized thank‑you emails 24&nbsp;h after delivery</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">💼 Finance & Admin</h3>
            <ul className="space-y-1">
              <li>Post daily Shopify sales & COGS into QuickBooks</li>
              <li>Create a “cash‑flow at‑a‑glance” Google Sheet every morning</li>
              <li>Slack alert for transactions &gt;&nbsp;$1&nbsp;000 flagged for review</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex max-w-3xl flex-col items-center gap-6 text-center">
        <h2 className="text-2xl font-semibold">Customer Voices</h2>
        <blockquote className="italic">&ldquo;Flowstate set up the inventory automation I’d been dreaming about in 8&nbsp;minutes—and I didn’t need a developer.&rdquo; — Hannah J., Handmade Jewelry Seller</blockquote>
        <blockquote className="italic">&ldquo;We replaced five separate zaps with one Flowstate canvas; now my team actually understands how the process works.&rdquo; — Mark L., Craft‑Coffee Roaster</blockquote>
      </section>

      <section className="flex w-full flex-col items-center gap-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold text-center">Pricing Snapshot</h2>
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-2">Plan</th>
              <th className="p-2">Free</th>
              <th className="p-2">Starter</th>
              <th className="p-2">Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            <tr>
              <td className="p-2 font-medium">Workflows</td>
              <td className="p-2">1</td>
              <td className="p-2">5</td>
              <td className="p-2">20</td>
            </tr>
            <tr>
              <td className="p-2 font-medium">Runs / month</td>
              <td className="p-2">500</td>
              <td className="p-2">5&nbsp;000</td>
              <td className="p-2">50&nbsp;000</td>
            </tr>
            <tr>
              <td className="p-2 font-medium">Price</td>
              <td className="p-2">$0</td>
              <td className="p-2">$29/mo</td>
              <td className="p-2">$99/mo</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm text-muted-foreground">All core features included • Upgrade anytime •</p>
      </section>

      <section className="flex max-w-3xl flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 text-left text-sm">
          <div>
            <h3 className="font-medium">Do I need coding skills?</h3>
            <p className="text-muted-foreground">No. If you can describe your process in a sentence and drag blocks on a canvas, you can automate with Flowstate.</p>
          </div>
          <div>
            <h3 className="font-medium">What apps do you integrate with?</h3>
            <p className="text-muted-foreground">Shopify, Etsy, Amazon MWS, QuickBooks, Gmail, Mailchimp, Google Sheets, Slack, and more—new connectors ship every month.</p>
          </div>
          <div>
            <h3 className="font-medium">Is it safe to connect my store and accounting data?</h3>
            <p className="text-muted-foreground">Yes. We use bank‑level encryption, never store credentials in plain text, and follow strict SOC‑2 controls.</p>
          </div>
          <div>
            <h3 className="font-medium">Can I invite my accountant or VA?</h3>
            <p className="text-muted-foreground">Absolutely. Share workflows with view‑only or full‑edit permissions, including per‑workflow access limits.</p>
          </div>
        </div>
      </section>

      <section className="flex max-w-3xl flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold">Ready to Reclaim Your Time?</h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg">Start Free Today</Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Book a Demo</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">(No credit card required. Cancel anytime.)</p>
      </section>
    </div>
  );
}
