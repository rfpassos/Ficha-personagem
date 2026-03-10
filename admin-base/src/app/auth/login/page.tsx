"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedLogo } from "@/components/layout/animated-logo"
import Link from "next/link"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen bg-background flex w-full">
            {/* Theme Toggle */}
            <div className="absolute top-4 right-4 z-50 lg:right-auto lg:left-4">
                <ThemeToggle />
            </div>

            {/* Left Side - Form (Glassmorphism-lite on mobile, Clean on desktop) */}
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
                        <h2 className="text-3xl font-semibold tracking-tight">Bem-vindo de volta</h2>
                        <p className="text-muted-foreground text-sm">
                            Entre com suas credenciais para acessar sua conta
                        </p>
                    </div>

                    {/* Form */}
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus:bg-background transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Senha</Label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-xs text-primary hover:underline"
                                >
                                    Esqueceu?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 h-11 bg-muted/30 border-muted-foreground/20 focus:bg-background transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer">
                                Lembrar de mim por 30 dias
                            </Label>
                        </div>

                        <Button className="w-full h-11 font-medium bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-lg shadow-sky-500/20" size="lg">
                            Entrar na Plataforma
                        </Button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Ou continue com
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="h-11 hover:bg-muted/50">
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" className="h-11 hover:bg-muted/50">
                                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </Button>
                        </div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground pt-4">
                        Não tem uma conta?{" "}
                        <Link href="/auth/register" className="font-semibold text-sky-500 hover:text-sky-600 hover:underline transition-colors">
                            Cadastre-se gratuitamente
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Hero (Abstract Premium Gradient) */}
            <div className="hidden lg:flex w-1/2 relative bg-zinc-900 border-l border-white/10 items-center justify-center overflow-hidden">
                <Image
                    src="/hero-placeholder.png"
                    alt="Abstract Future Hero"
                    fill
                    className="object-cover opacity-80"
                    priority
                />

                {/* Overlay Gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                <div className="relative z-10 p-12 max-w-lg text-center backdrop-blur-sm bg-black/10 rounded-2xl border border-white/5 shadow-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <h3 className="text-4xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent mb-4">
                            Acelere seu Desenvolvimento
                        </h3>
                        <p className="text-lg text-white/60 leading-relaxed">
                            Uma fundação robusta e padronizada para criar aplicações modernas de alta performance. Agilidade e qualidade visual em um só lugar.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
