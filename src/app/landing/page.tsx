import { Rocket, CheckCircle2, LayoutDashboard, MousePointerClick, Moon, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Feature({ icon: Icon, title, description }: { icon: React.FC<any>; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <Icon className="size-8 text-primary" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center gap-16 px-6 py-12">
      <section className="flex max-w-2xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold">Automate your workflows</h1>
        <p className="text-muted-foreground">
          Build complex automations with an intuitive drag-and-drop editor.
        </p>
        <Button size="lg">Get Started</Button>
      </section>
      <section className="flex max-w-3xl flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="text-muted-foreground">
          Flowstate is a drag-and-drop automation builder that converts natural language prompts into configurable workflows for small businesses.
        </p>
      </section>
      <section className="flex max-w-4xl flex-col items-center gap-8">
        <h2 className="text-2xl font-semibold text-center">Key Features</h2>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <Feature
            icon={Rocket}
            title="Fast Setup"
            description="Create workflows in minutes with prebuilt nodes."
          />
          <Feature
            icon={CheckCircle2}
            title="Reliable"
            description="Run your automations with confidence and visibility."
          />
          <Feature
            icon={MousePointerClick}
            title="Drag & Drop"
            description="Arrange nodes visually with a simple editor."
          />
          <Feature
            icon={LayoutDashboard}
            title="Automatic Layout"
            description="Keep your workflows tidy with built-in layouting."
          />
          <Feature
            icon={Moon}
            title="Dark Mode"
            description="Switch themes to reduce eye strain at night."
          />
          <Feature
            icon={PlayCircle}
            title="Workflow Runner"
            description="Test and monitor steps directly in the editor."
          />
        </div>
      </section>
      <section className="flex max-w-3xl flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold">Pricing</h2>
        <p className="text-muted-foreground">Affordable plans are coming soon. Try the open-source edition today.</p>
        <Button size="lg">View Pricing</Button>
      </section>
    </div>
  );
}
