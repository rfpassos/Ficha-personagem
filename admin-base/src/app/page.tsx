"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Zap, Github, Rocket } from "lucide-react";
import { LoopStudioLogo } from "@/components/brand/logo";
import {
  NextJsIcon,
  ReactIcon,
  TailwindIcon,
  TypeScriptIcon,
  ZodIcon,
} from "@/components/brand/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrainPowerSection } from "@/components/landing/brain-power-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* Header Fixo */}
      <header className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="https://www.loopstudio.ia.br/" target="_blank">
            <LoopStudioLogo size="sm" />
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
              <Link
                href="#stack"
                className="hover:text-primary transition-colors"
              >
                Stack
              </Link>
              <Link
                href="#brain-power"
                className="hover:text-primary transition-colors"
              >
                Neural
              </Link>
              <Link
                href="#showcase"
                className="hover:text-primary transition-colors"
              >
                Exemplos
              </Link>
            </nav>
            <Separator orientation="vertical" className="h-6 hidden md:block" />
            <ThemeToggle />
            <Link href="/dashboard">
              <Button
                size="sm"
                className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20"
              >
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 1. Hero Section - Brutalist Typography & Asymmetry */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden">
        {/* Abstract Background Elements - Warm/Pink Tones instead of Blue */}
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[100px] opacity-20" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          <div className="space-y-10 animate-in fade-in slide-in-from-left-6 duration-700 fill-mode-forwards">
            {/* Badge Refined */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium animate-in zoom-in duration-500 delay-100">
              <Rocket className="w-4 h-4 fill-current" />
              <span>Acelere seu desenvolvimento v2.0</span>
            </div>

            {/* Title Refined - Cohesive Hierarchy */}
            <div className="flex flex-col gap-4">
                <span className="text-xl md:text-2xl font-bold tracking-widest text-muted-foreground uppercase">
                    PROJETO BASE
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1]">
                    O ponto de <br className="hidden md:block"/>partida para o <br/>
                    <span className="bg-gradient-to-r from-primary via-rose-500 to-orange-500 bg-clip-text text-transparent pb-3 inline-block">
                        Extraordinário
                    </span>
                </h1>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed font-light">
              Esqueça temas básicos. Um sistema de produção{" "}
              <strong className="text-foreground font-semibold">
                Enterprise Ready
              </strong>{" "}
              com Design System Premium e Agentes AI integrados.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <Link href="/dashboard/design-system">
                <Button
                  size="xl"
                  className="w-full sm:w-auto text-lg px-10 h-16 rounded-2xl gap-3 shadow-xl shadow-primary/25 hover:scale-[1.02] hover:shadow-primary/40 transition-all duration-300 font-bold"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  Explorar Sistema
                </Button>
              </Link>
              <Link href="#brain-power">
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full sm:w-auto text-lg px-10 h-16 rounded-2xl border-2 bg-transparent hover:bg-accent/50 font-medium"
                >
                  Ver Skills AI
                </Button>
              </Link>
            </div>

            {/* Social Proof - Refined */}
            <div className="flex items-center gap-6 pt-10 border-t border-border/40">
              <div className="flex -space-x-5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative w-12 h-12 rounded-full border-2 border-background ring-2 ring-background overflow-hidden transition-transform hover:-translate-y-2 hover:z-10 hover:scale-110 duration-300 grayscale hover:grayscale-0"
                  >
                    <Image
                      src={`/images/landing/avatar-${i}.png`}
                      alt={`User ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium">
                <span className="block text-foreground tracking-tight">
                  Trusted by Architects
                </span>
                <span className="text-muted-foreground text-xs uppercase tracking-widest">
                  Enterprise Standard
                </span>
              </div>
            </div>
          </div>

          {/* Visual Element - tilted and layered */}
          <div className="relative group perspective-1000 hidden lg:block">
            <div className="relative rounded-3xl border border-white/10 bg-slate-950/50 p-3 shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 transform transition-transform group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg] group-hover:scale-[1.02] duration-500 ease-out">
              {/* Hero Image Real */}
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                <Image
                  src="/images/landing/hero-dev-environment.png"
                  alt="Modern Developer Workspace - Loop Studio IA"
                  width={1200}
                  height={900}
                  className="object-cover w-full h-full opacity-90 transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay opacity-60" />
              </div>

              {/* Floating Stats Block */}
              <div className="absolute -left-12 bottom-12 p-5 bg-background/95 backdrop-blur-xl rounded-2xl border shadow-xl animate-bounce-slow hidden xl:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
                    <Zap className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-foreground">
                      Build Success
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      32ms (Turbo)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tech Stack - Vibrant Light / Minimal Dark */}
      <section
        id="stack"
        className="py-24 border-y border-border/40 bg-slate-50/50 dark:bg-muted/20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-bold tracking-widest uppercase text-muted-foreground">
              Tech Stack de Elite
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-12 items-center justify-items-center">
            <StackItem
              icon={<NextJsIcon className="w-12 h-12 md:w-16 md:h-16" />}
              name="Next.js 16"
              href="https://nextjs.org/"
            />
            <StackItem
              icon={<ReactIcon className="w-12 h-12 md:w-16 md:h-16" />}
              name="React 19"
              href="https://react.dev/"
            />
            <StackItem
              icon={<TailwindIcon className="w-12 h-12 md:w-16 md:h-16" />}
              name="Tailwind v4"
              href="https://tailwindcss.com/"
            />
            <StackItem
              icon={<TypeScriptIcon className="w-12 h-12 md:w-16 md:h-16" />}
              name="TypeScript"
              href="https://www.typescriptlang.org/"
            />
            <StackItem
              icon={<ZodIcon className="w-12 h-12 md:w-16 md:h-16" />}
              name="Zod Validations"
              href="https://zod.dev/"
            />
          </div>
        </div>
      </section>

      {/* 3. Antigravity Recommendation - Premium Dark Card */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#1a1b1e] dark:bg-slate-900 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden group shadow-2xl shadow-black/20">
            {/* Glow Effect Refined */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-colors duration-700" />

            <div className="flex-1 space-y-8 z-10 text-center md:text-left text-white">
              <Badge
                variant="outline"
                className="border-white/20 text-white bg-white/10 px-4 py-1"
              >
                IDE Recomendada
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Desenvolva na <br />
                <span className="text-primary">Velocidade da Luz</span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed font-light">
                Otimizado para <strong>Antigravity</strong>. A experiência
                agentic nativa que transforma sêniors em arquitetos de sistemas.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="https://antigravity.google/" target="_blank">
                  <Button
                    size="lg"
                    className="rounded-full px-8 h-14 text-base gap-3 bg-white text-black hover:bg-slate-200 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all font-bold"
                  >
                    Conhecer Antigravity
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-full md:w-[350px] flex justify-center z-10">
              <div className="relative w-full aspect-square flex items-center justify-center p-12 bg-gradient-to-br from-white/10 to-transparent rounded-3xl border border-white/10 backdrop-blur-sm transform group-hover:rotate-3 transition-transform duration-500">
                <img
                  src="https://antigravity.google/assets/image/antigravity-logo.png"
                  alt="Antigravity Logo"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brain Power (Agents + Workflows + Skills) */}
      <BrainPowerSection />

      {/* 5. Showcase Real - Asymmetric Grid */}
      <section id="showcase" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-6">
              <h2 className="text-5xl font-black tracking-tight">
                Experiência Real
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl font-light">
                Telas de altíssima fidelidade geradas com Shadcn UI.
              </p>
            </div>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="gap-2 rounded-full h-12 px-8"
              >
                Ver Demo ao Vivo <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Staggered Grid Effect */}
            <div className="space-y-10">
              <ShowcaseCard
                src="/images/landing/showcase-dashboard.png"
                title="Analytic Dashboard"
                tag="Admin"
                delay={0}
              />
              <ShowcaseCard
                src="/images/landing/showcase-auth.png"
                title="Authentication"
                tag="Security"
                delay={200}
                className="md:translate-x-8"
              />
            </div>
            <div className="space-y-10 md:pt-20">
              <ShowcaseCard
                src="/images/landing/showcase-kanban.png"
                title="Kanban Board"
                tag="Productivity"
                delay={100}
              />
              <ShowcaseCard
                src="/images/landing/showcase-crud.png"
                title="Advanced Tables"
                tag="Data"
                delay={300}
                className="md:-translate-x-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer CTA */}
      <section className="py-32 border-t relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <Link href="https://www.loopstudio.ia.br/" target="_blank">
            <LoopStudioLogo size="lg" className="justify-center mb-8" />
          </Link>
          <h2 className="text-6xl font-black tracking-tighter">
            O Futuro é Agora.
          </h2>
          <p className="text-2xl text-muted-foreground font-light">
            Não perca tempo configurando. Comece entregando valor hoje.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <Link href="/dashboard">
              <Button
                size="xl"
                className="h-16 px-12 text-xl rounded-2xl shadow-2xl shadow-primary/20 hover:scale-105 transition-transform bg-foreground text-background hover:bg-foreground/90 font-bold"
              >
                Acessar Dashboard
              </Button>
            </Link>
            <Link
              href="https://github.com/rfpassos/Projeto-Base"
              target="_blank"
            >
              <Button
                size="xl"
                variant="secondary"
                className="h-16 px-12 text-xl gap-3 rounded-2xl bg-background hover:bg-background/80 border text-foreground font-medium"
              >
                <Github className="w-6 h-6" />
                GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t text-center text-sm text-muted-foreground">
        © 2026 Loop Studio IA. All rights reserved. Built with Antigravity.
      </footer>
    </div>
  );
}

// Subcomponentes

function StackItem({
  icon,
  name,
  href,
}: {
  icon: React.ReactNode;
  name: string;
  href?: string;
}) {
  const content = (
    <div className="flex flex-col items-center gap-4 group cursor-pointer p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 bg-white border border-slate-200/60 shadow-sm hover:shadow-md grayscale hover:grayscale-0 dark:bg-transparent dark:border-transparent dark:shadow-none dark:hover:bg-muted/50 dark:opacity-70 dark:hover:opacity-100 dark:grayscale dark:hover:grayscale-0 w-full max-w-[180px]">
      <div className="transition-transform duration-300 drop-shadow-md group-hover:drop-shadow-xl group-hover:scale-110 dark:group-hover:filter-[drop-shadow(0_0_8px_rgba(233,30,99,0.8))]">
        {icon}
      </div>
      <span className="font-semibold text-muted-foreground group-hover:text-primary transition-colors text-sm md:text-base whitespace-nowrap">
        {name}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
}

function ShowcaseCard({
  src,
  title,
  tag,
  delay,
  className,
}: {
  src: string;
  title: string;
  tag: string;
  delay: number;
  className?: string;
}) {
  return (
    <div
      className={`group relative rounded-2xl overflow-hidden border bg-background shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${className}`}
    >
      <div className="absolute top-4 left-4 z-10">
        <Badge className="bg-background/90 backdrop-blur text-foreground border shadow-sm hover:bg-background px-3 py-1 text-sm font-semibold">
          {tag}
        </Badge>
      </div>
      <div className="aspect-[16/10] bg-muted relative overflow-hidden">
        <Image
          src={src}
          alt={title}
          width={800}
          height={500}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6 border-t bg-card relative">
        <h3 className="font-bold text-xl">{title}</h3>
        <div className="w-full h-1 bg-gradient-to-r from-primary to-transparent absolute bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </div>
  );
}
