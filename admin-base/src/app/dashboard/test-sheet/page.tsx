"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
    Terminal, 
    Play, 
    Download, 
    Trash2, 
    FileText, 
    CheckCircle2, 
    AlertCircle, 
    Loader2, 
    ExternalLink 
} from "lucide-react"
import { cn } from "@/lib/utils"

// Chave gerada para teste
const TEST_API_KEY = "rgs_4ea62aa32c5458c397ef621236ded7f061c0d960"
const API_BASE_URL = "http://localhost:3001"

interface LogEntry {
    message: string
    type: "info" | "success" | "error" | "loading"
    timestamp: string
}

export default function TestSheetPage() {
    const [files, setFiles] = React.useState<File[]>([])
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [logs, setLogs] = React.useState<LogEntry[]>([])
    const [jobId, setJobId] = React.useState<string | null>(null)
    const [status, setStatus] = React.useState<"IDLE" | "PENDING" | "SUCCESS" | "ERROR">("IDLE")
    const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null)
    const [progressValue, setProgressValue] = React.useState(0)

    const scrollRef = React.useRef<HTMLDivElement>(null)

    // Auto-scroll para o fim dos logs
    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [logs])

    const addLog = (message: string, type: LogEntry["type"] = "info") => {
        const timestamp = new Date().toLocaleTimeString()
        setLogs(prev => [...prev, { message, type, timestamp }])
    }

    const clearScreen = () => {
        setFiles([])
        setIsProcessing(false)
        setLogs([])
        setJobId(null)
        setStatus("IDLE")
        setDownloadUrl(null)
        setProgressValue(0)
    }

    const handleProcess = async () => {
        if (files.length === 0) return

        const file = files[0]
        const extension = file.name.split('.').pop()?.toLowerCase()
        const contentType = extension === 'json' ? 'json' : 'markdown'

        clearScreen()
        setFiles([file]) // Mantém o arquivo visualmente
        setStatus("PENDING")
        setIsProcessing(true)
        addLog(`Iniciando processamento do arquivo: ${file.name}...`, "info")
        setProgressValue(10)

        try {
            const content = await file.text()
            addLog(`Conteúdo lido com sucesso (${contentType}). Enviando para API...`, "success")
            setProgressValue(25)

            const response = await fetch(`${API_BASE_URL}/api/v1/sheets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': TEST_API_KEY
                },
                body: JSON.stringify({ contentType, content })
            })

            if (!response.ok) {
                const errData = await response.json()
                throw new Error(errData.error || "Erro ao iniciar job na API")
            }

            const data = await response.json()
            const id = data.jobId
            setJobId(id)
            addLog(`Job criado com sucesso! ID: ${id}`, "success")
            addLog("Aguardando processamento em background...", "loading")
            setProgressValue(40)

            // Polling de status
            pollStatus(id)

        } catch (error: any) {
            addLog(`Erro fatal: ${error.message}`, "error")
            setIsProcessing(false)
            setStatus("ERROR")
        }
    }

    const pollStatus = async (id: string) => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/sheets/${id}`, {
                    headers: { 'X-API-KEY': TEST_API_KEY }
                })
                
                if (!response.ok) throw new Error("Erro ao consultar status")

                const data = await response.json()
                
                if (data.status === "SUCCESS") {
                    clearInterval(interval)
                    addLog("Processamento concluído com sucesso!", "success")
                    addLog(`Personagem identificado: ${data.character}`, "info")
                    setDownloadUrl(`${API_BASE_URL}${data.downloadUrl}?x-api-key=${TEST_API_KEY}`)
                    setStatus("SUCCESS")
                    setIsProcessing(false)
                    setProgressValue(100)
                } else if (data.status === "ERROR") {
                    clearInterval(interval)
                    addLog(`Erro no processamento: ${data.error}`, "error")
                    setStatus("ERROR")
                    setIsProcessing(false)
                } else {
                    // Ainda PENDING - atualizar progresso visualmente
                    setProgressValue(prev => Math.min(prev + 5, 95))
                    // Adicionar log ocasionalmente ou baseado em mudanças (aqui apenas simulado por simplicidade)
                    if (Math.random() > 0.7) {
                        addLog("Aguardando IA e recursos de mídia...", "loading")
                    }
                }
            } catch (error: any) {
                clearInterval(interval)
                addLog(`Erro no polling: ${error.message}`, "error")
                setIsProcessing(false)
                setStatus("ERROR")
            }
        }, 3000)
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Testador de Fichas</h1>
                    <p className="text-muted-foreground mt-1">Ambiente seguro para validar a geração de PDFs e imagens.</p>
                </div>
                <Button variant="outline" size="sm" onClick={clearScreen} disabled={isProcessing}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Limpar Tela
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Coluna de Input */}
                <div className="space-y-6">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="w-5 h-5 text-sky-400" />
                                Carregar Ficha
                            </CardTitle>
                            <CardDescription>Suba um arquivo .json ou .md para iniciar o processo</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FileUpload 
                                accept=".json,.md" 
                                multiple={false}
                                maxSize={2}
                                onFilesChange={(newFiles) => setFiles(newFiles)}
                                disabled={isProcessing}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button 
                                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                                disabled={files.length === 0 || isProcessing}
                                onClick={handleProcess}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Processando...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-5 h-5 mr-2" />
                                        Gerar Ficha
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>

                    {status === "SUCCESS" && downloadUrl && (
                        <Card className="border-emerald-500/20 bg-emerald-500/5 animate-in fade-in slide-in-from-bottom-2">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2 text-emerald-400">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Ficha Gerada!
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">O processo foi finalizado e o arquivo está pronto para download.</p>
                                <div className="flex gap-3">
                                    <Button asChild className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                                        <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                                            <Download className="w-4 h-4 mr-2" />
                                            Baixar PDF
                                        </a>
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {status === "ERROR" && (
                        <Card className="border-destructive/20 bg-destructive/5">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                                    <AlertCircle className="w-5 h-5" />
                                    Falha na Geração
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-destructive/80">Ocorreu um erro durante o processamento. Verifique os logs ao lado para mais detalhes.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Coluna de Logs (Terminal) */}
                <Card className="border-border/50 bg-[#0c0c0e] shadow-2xl relative overflow-hidden flex flex-col h-[500px] lg:h-auto">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                        <Progress value={progressValue} className="h-full rounded-none bg-sky-500/20" />
                    </div>
                    <CardHeader className="bg-muted/30 py-3 border-b border-border/50">
                        <CardTitle className="text-xs font-mono uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                            <Terminal className="w-3 h-3" />
                            Execution Logs
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden bg-black/40">
                        <ScrollArea className="h-full p-4 font-mono text-sm" ref={scrollRef}>
                            <div className="space-y-1.5">
                                {logs.length === 0 ? (
                                    <div className="text-muted-foreground/30 flex flex-col items-center justify-center h-64 italic">
                                        <Terminal className="w-8 h-8 mb-2 opacity-10" />
                                        Aguardando início...
                                    </div>
                                ) : (
                                    logs.map((log, i) => (
                                        <div key={i} className="flex gap-3 animate-in fade-in duration-300">
                                            <span className="text-muted-foreground/40 shrink-0">[{log.timestamp}]</span>
                                            <span className={cn(
                                                "break-words",
                                                log.type === "success" && "text-emerald-400",
                                                log.type === "error" && "text-red-400",
                                                log.type === "loading" && "text-sky-400 animate-pulse",
                                                log.type === "info" && "text-zinc-300"
                                            )}>
                                                {log.type === "loading" && "> "}
                                                {log.message}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <div className="p-2 bg-muted/20 border-t border-border/50 flex justify-between items-center px-4">
                        <Badge variant="outline" className={cn(
                            "text-[10px] uppercase",
                            status === "PENDING" && "border-sky-500 text-sky-500",
                            status === "SUCCESS" && "border-emerald-500 text-emerald-500",
                            status === "ERROR" && "border-red-500 text-red-500",
                            status === "IDLE" && "text-muted-foreground"
                        )}>
                            Status: {status}
                        </Badge>
                        {isProcessing && (
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-ping" />
                                <span className="text-[10px] text-sky-500 font-bold uppercase tracking-tighter">Live</span>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}
