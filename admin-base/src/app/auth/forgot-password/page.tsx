"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedLogo } from "@/components/layout/animated-logo"
import Link from "next/link"
import Image from "next/image"
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ForgotPasswordPage() {
    const [submitted, setSubmitted] = useState(false)
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-background flex w-full">
            {/* Theme Toggle */}
            <div className="absolute top-4 right-4 z-50 lg:right-auto lg:left-4">
                <ThemeToggle />
            </div>

            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10">
                <div className="w-full max-w-[400px] space-y-8">

                    {/* Header */}
                    <div className="flex flex-col space-y-2 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                            <AnimatedLogo className="w-12 h-12" />
                            <h1 className="text-2xl font-bold">
                                Loop Studio <span className="bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent">IA</span>
                            </h1>
                        </div>
                    </div>

                    {!submitted ? (
                        <>
                            <div className="flex flex-col space-y-2 text-center lg:text-left">
                                <h2 className="text-3xl font-semibold tracking-tight">Recuperar Senha</h2>
                                <p className="text-muted-foreground text-sm">
                                    Digite seu email e enviaremos um link para redefinir sua senha
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="seu@email.com"
                                            className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus:bg-background transition-colors"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button className="w-full h-11 font-medium bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-lg shadow-sky-500/20" size="lg" type="submit">
                                    Enviar Link de Recuperação
                                </Button>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center text-center space-y-6 py-6"
                        >
                            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center ring-2 ring-green-500/20">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold tracking-tight">Email Enviado!</h2>
                                <p className="text-muted-foreground max-w-xs mx-auto">
                                    Enviamos um link de recuperação para <br />
                                    <strong className="text-foreground">{email}</strong>
                                </p>
                            </div>

                            <p className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg border border-border/50">
                                Verifique sua caixa de entrada e clique no link para redefinir sua senha. O link expira em 24 horas.
                            </p>

                            <Button
                                variant="outline"
                                className="w-full h-11 mt-4"
                                onClick={() => setSubmitted(false)}
                            >
                                Tentar outro email
                            </Button>
                        </motion.div>
                    )}

                    <div className="flex justify-center pt-4">
                        <Link
                            href="/auth/login"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 group"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Voltar para o login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Hero */}
            <div className="hidden lg:flex w-1/2 relative bg-zinc-900 border-l border-white/10 items-center justify-center overflow-hidden">
                <Image
                    src="/forgot-password-hero.png"
                    alt="Abstract Neural Hero"
                    fill
                    className="object-cover opacity-80"
                    priority
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                <div className="relative z-10 p-12 max-w-lg text-center backdrop-blur-sm bg-black/10 rounded-2xl border border-white/5 shadow-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <h3 className="text-4xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent mb-4">
                            Recupere seu Acesso
                        </h3>
                        <p className="text-lg text-white/60 leading-relaxed">
                            Segurança em primeiro lugar. Siga os passos simplificados para retomar o controle da sua conta.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
