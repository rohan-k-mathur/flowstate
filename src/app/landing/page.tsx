import { Rocket, CheckCircle2 } from 'lucide-react';
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
      <section className="grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
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
      </section>
    </div>
  );
}
