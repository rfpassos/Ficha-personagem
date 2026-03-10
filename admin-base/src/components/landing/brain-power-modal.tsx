"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Bot, Command, Wrench } from "lucide-react"
import { useState } from "react"
import { AGENTS_LIST, SKILLS_LIST, WORKFLOWS_LIST } from "@/data/brain-power-data"

interface BrainPowerModalProps {
    type: "agents" | "workflows" | "skills"
    trigger: React.ReactNode
}

export function BrainPowerModal({ type, trigger }: BrainPowerModalProps) {
    const [search, setSearch] = useState("")

    const getData = () => {
        switch (type) {
            case "agents": return {
                title: "Agentes Especialistas",
                desc: "Personas de IA com conhecimento profundo em domínios específicos.",
                icon: <Bot className="w-5 h-5 text-primary" />,
                items: AGENTS_LIST
            }
            case "workflows": return {
                title: "Workflows de Automação",
                desc: "Processos estruturados para acelerar tarefas repetitivas.",
                icon: <Command className="w-5 h-5 text-amber-500" />,
                items: WORKFLOWS_LIST
            }
            case "skills": return {
                title: "Skills Modulares",
                desc: "Biblioteca de capacidades técnicas que os agentes podem invocar.",
                icon: <Wrench className="w-5 h-5 text-rose-500" />,
                items: SKILLS_LIST
            }
        }
    }

    const { title, desc, icon, items } = getData()

    const filteredItems = items.filter((item: any) => {
        const query = search.toLowerCase()
        return (
            (item.name?.toLowerCase().includes(query) || "") ||
            (item.title?.toLowerCase().includes(query) || "") ||
            (item.description?.toLowerCase().includes(query) || "") ||
            (item.desc?.toLowerCase().includes(query) || "")
        )
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0 gap-0 bg-background border-border overflow-hidden dark:bg-[#0f1115] dark:border-white/10">

                {/* Header Customizado */}
                <div className="p-6 border-b border-border bg-muted/30 dark:border-white/5 dark:bg-white/5">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-xl">
                            <div className="p-2 rounded-lg border border-border bg-background dark:border-white/10">
                                {icon}
                            </div>
                            {title}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground dark:text-slate-400">
                            {desc}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="relative mt-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder={`Buscar ${type}...`}
                            className="pl-9 focus-visible:ring-primary/50 bg-background border-input dark:bg-black/20 dark:border-white/5"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <ScrollArea className="flex-1 p-6">
                    <div className="grid gap-4">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item: any, i: number) => (
                                <div key={i} className="group flex flex-col gap-2 p-4 rounded-xl border transition-colors bg-card border-border hover:bg-muted/50 dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                                            {item.title || item.name}
                                            {item.cmd && (
                                                <Badge variant="outline" className="font-mono text-[10px] border-primary/20 text-primary bg-primary/5">
                                                    {item.cmd}
                                                </Badge>
                                            )}
                                        </h3>
                                        {item.role && (
                                            <Badge variant="secondary" className="text-[10px] opacity-70">
                                                {item.role}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {item.description || item.desc}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-muted-foreground">
                                Nenhum item encontrado para "{search}"
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <div className="p-4 border-t text-xs text-center text-muted-foreground border-border bg-muted/30 dark:border-white/5 dark:bg-black/20">
                    Mostrando {filteredItems.length} de {items.length} itens
                </div>

            </DialogContent>
        </Dialog>
    )
}
