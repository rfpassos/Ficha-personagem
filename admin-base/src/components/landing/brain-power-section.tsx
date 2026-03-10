"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    BrainCircuit, Code2, Bot, Terminal, Shield,
    Palette, Database, Smartphone, LayoutTemplate,
    GitBranch, Bug, Search, Rocket, Microscope,
    Wrench, Zap, Layers, Command
} from "lucide-react"
import { BrainPowerModal } from "@/components/landing/brain-power-modal"

// Dados Mockados agora servem apenas para o preview, o modal usa os dados completos
const AGENTS = [
    { title: "Orchestrator", role: "Master", icon: <BrainCircuit className="w-6 h-6" />, desc: "Gerencia múltiplos agentes para tarefas complexas." },
    { title: "Frontend Specialist", role: "Specialist", icon: <Palette className="w-6 h-6" />, desc: "Arquiteto UI/UX focado em React, Tailwind e Design System." },
    { title: "Backend Specialist", role: "Specialist", icon: <Database className="w-6 h-6" />, desc: "Especialista em APIs, Banco de Dados e Segurança." },
    { title: "Mobile Developer", role: "Specialist", icon: <Smartphone className="w-6 h-6" />, desc: "Desenvolvimento nativo e híbrido (React Native/Flutter)." },
    { title: "Project Planner", role: "Strategist", icon: <LayoutTemplate className="w-6 h-6" />, desc: "Planejamento estruturado e quebra de tarefas." },
    { title: "Security Auditor", role: "Security", icon: <Shield className="w-6 h-6" />, desc: "Análise de vulnerabilidades e hardening." },
    { title: "QA Engineer", role: "Quality", icon: <Bug className="w-6 h-6" />, desc: "Testes automatizados e garantia de qualidade." },
    { title: "DevOps Engineer", role: "Ops", icon: <GitBranch className="w-6 h-6" />, desc: "CI/CD, Deploy e Infraestrutura." },
]

const WORKFLOWS = [
    { cmd: "/create", title: "App Builder", icon: <Rocket className="w-5 h-5" />, desc: "Cria aplicações completas do zero interativamente." },
    { cmd: "/orchestrate", title: "Deep Orchestration", icon: <Layers className="w-5 h-5" />, desc: "Coordena um time de agentes para resolver problemas grandes." },
    { cmd: "/debug", title: "Systematic Debug", icon: <Microscope className="w-5 h-5" />, desc: "Protocolo de 4 fases para investigar e corrigir erros." },
    { cmd: "/plan", title: "Project Architectural", icon: <LayoutTemplate className="w-5 h-5" />, desc: "Gera planos de implementação detalhados antes do código." },
    { cmd: "/ui-ux-pro-max", title: "UI Forge", icon: <Palette className="w-5 h-5" />, desc: "Fluxo avançado para criação de interfaces premium." },
    { cmd: "/test", title: "Test Suite", icon: <Shield className="w-5 h-5" />, desc: "Geração e execução automática de testes." },
]

const SKILL_CATEGORIES = [
    { name: "Development", count: 18, skills: ["Next.js Expert", "React Patterns", "API Creator", "Form Builder"], icon: <Code2 /> },
    { name: "Design & UX", count: 12, skills: ["Frontend Design", "Mobile UX", "Tailwind Patterns", "Accessibility"], icon: <Palette /> },
    { name: "Quality & Security", count: 10, skills: ["Code Reviewer", "Vulnerability Scanner", "Systematic Debugging"], icon: <Shield /> },
    { name: "DevOps & Docs", count: 8, skills: ["Deployment Proc", "Docs Keeper", "Git Commits", "Server Mgmt"], icon: <Terminal /> },
]

export function BrainPowerSection() {
    const [activeTab, setActiveTab] = useState<"agents" | "workflows" | "skills">("agents")

    return (
        <section id="brain-power" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                    <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-4 py-1.5 rounded-full text-sm font-medium">
                        Antigravity Core v2.0
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                        Neural Network <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-500">Arsenal</span>
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Uma força de trabalho digital completa. <strong className="text-foreground">19 Agentes</strong> especialistas, <strong className="text-foreground">11 Workflows</strong> automatizados e <strong className="text-foreground">48 Skills</strong> modulares à sua disposição.
                    </p>
                </div>

                {/* Tabs Controller */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex p-1 bg-muted/50 rounded-full border border-border/50 backdrop-blur-sm">
                        <TabButton
                            active={activeTab === "agents"}
                            onClick={() => setActiveTab("agents")}
                            icon={<Bot className="w-4 h-4" />}
                            label="19 Agentes"
                        />
                        <TabButton
                            active={activeTab === "workflows"}
                            onClick={() => setActiveTab("workflows")}
                            icon={<Command className="w-4 h-4" />}
                            label="11 Workflows"
                        />
                        <TabButton
                            active={activeTab === "skills"}
                            onClick={() => setActiveTab("skills")}
                            icon={<Wrench className="w-4 h-4" />}
                            label="48 Skills"
                        />
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[600px]">
                    <AnimatePresence mode="wait">

                        {/* AGENTS VIEW */}
                        {activeTab === "agents" && (
                            <motion.div
                                key="agents"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                    {AGENTS.map((agent, i) => (
                                        <Card key={i} className="group border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300">
                                            <CardHeader>
                                                <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                                                    {agent.icon}
                                                </div>
                                                <CardTitle className="text-xl">{agent.title}</CardTitle>
                                                <CardDescription className="text-xs font-mono uppercase tracking-widest text-primary/80 mt-1">
                                                    {agent.role}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {agent.desc}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <div className="text-center">
                                    <BrainPowerModal
                                        type="agents"
                                        trigger={
                                            <Button variant="outline" className="rounded-full gap-2 hover:bg-primary hover:text-white transition-colors">
                                                Explorar Todos os Agentes <Bot className="w-4 h-4" />
                                            </Button>
                                        }
                                    />
                                </div>
                            </motion.div>
                        )}



                        {/* WORKFLOWS VIEW */}
                        {activeTab === "workflows" && (
                            <motion.div
                                key="workflows"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                    {WORKFLOWS.map((wf, i) => (
                                        <div key={i} className="flex gap-6 items-start p-6 rounded-2xl border border-dashed border-border hover:border-primary/50 hover:bg-muted/30 transition-all group">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-all">
                                                {wf.icon}
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-bold flex items-center gap-2">
                                                    {wf.title}
                                                    <Badge variant="secondary" className="font-mono text-[10px] px-1.5 h-5">
                                                        {wf.cmd}
                                                    </Badge>
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {wf.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-center">
                                    <BrainPowerModal
                                        type="workflows"
                                        trigger={
                                            <Button variant="outline" className="rounded-full gap-2 hover:bg-primary hover:text-white transition-colors">
                                                Explorar Todos os Workflows <Command className="w-4 h-4" />
                                            </Button>
                                        }
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* SKILLS VIEW */}
                        {activeTab === "skills" && (
                            <motion.div
                                key="skills"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                    {SKILL_CATEGORIES.map((cat, i) => (
                                        <Card key={i} className="border-none shadow-lg bg-gradient-to-br from-card to-muted/20 overflow-hidden relative">
                                            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                                <div className="w-12 h-12 rounded-full bg-background shadow-sm flex items-center justify-center text-foreground z-10">
                                                    {cat.icon}
                                                </div>
                                                <div className="z-10">
                                                    <CardTitle className="text-2xl">{cat.name}</CardTitle>
                                                    <CardDescription>{cat.count}+ Skills Mapeadas</CardDescription>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="z-10 relative">
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {cat.skills.map((skill) => (
                                                        <Badge key={skill} variant="secondary" className="px-3 py-1 bg-background/50 hover:bg-background transition-colors">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                    <Badge variant="outline" className="opacity-50">+ {cat.count - 4} outros</Badge>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <div className="text-center">
                                    <p className="text-muted-foreground mb-6">
                                        E muito mais: <span className="text-foreground font-medium">Internationalization, Game Dev, SEO, Bash/Linux...</span>
                                    </p>
                                    <BrainPowerModal
                                        type="skills"
                                        trigger={
                                            <Button variant="outline" className="rounded-full gap-2 hover:bg-primary hover:text-white transition-colors">
                                                Explorar Todas as Skills <Wrench className="w-4 h-4" />
                                            </Button>
                                        }
                                    />
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

            </div>
        </section >
    )
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative
                ${active ? 'text-white' : 'text-muted-foreground hover:text-foreground'}
            `}
        >
            {active && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className="relative z-10 flex items-center gap-2">
                {icon} {label}
            </span>
        </button>
    )
}
