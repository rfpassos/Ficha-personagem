"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { Lock, Eye, EyeOff, CheckCircle2, ShieldCheck } from "lucide-react"
import { useState } from "react"

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            {/* Theme Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                            <svg
                                className="w-full h-full drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                                viewBox="0 0 100 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M25 50C25 36.1929 36.1929 25 50 25C63.8071 25 75 36.1929 75 50"
                                    stroke="#38bdf8"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M75 50C75 63.8071 63.8071 75 50 75C36.1929 75 25 63.8071 25 50"
                                    stroke="url(#paint0_reset)"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray="1 12"
                                />
                                <defs>
                                    <linearGradient id="paint0_reset" x1="25" y1="50" x2="75" y2="50" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#38bdf8" />
                                        <stop offset="1" stopColor="#818cf8" />
                                    </linearGradient>
                                </defs>
                                <circle cx="50" cy="50" r="7" className="fill-foreground" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">
                            Loop Studio <span className="bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent">IA</span>
                        </h1>
                    </div>
                </div>

                {/* Reset Password Card */}
                <Card className="border-border">
                    {!submitted ? (
                        <>
                            <CardHeader className="space-y-1 pb-4">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                        <ShieldCheck className="w-8 h-8 text-primary" />
                                    </div>
                                </div>
                                <CardTitle className="text-2xl text-center">Redefinir Senha</CardTitle>
                                <CardDescription className="text-center">
                                    Crie uma nova senha segura para sua conta
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* New Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Nova Senha</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="pl-10 pr-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Mínimo de 8 caracteres com letras e números
                                        </p>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="pl-10 pr-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button className="w-full" size="lg" type="submit">
                                        Redefinir Senha
                                    </Button>
                                </form>
                            </CardContent>
                        </>
                    ) : (
                        <>
                            <CardHeader className="space-y-1 pb-4">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-8 h-8 text-accent" />
                                    </div>
                                </div>
                                <CardTitle className="text-2xl text-center">Senha Redefinida!</CardTitle>
                                <CardDescription className="text-center">
                                    Sua senha foi alterada com sucesso
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground text-center">
                                    Agora você pode fazer login com sua nova senha.
                                </p>
                                <Link href="/auth/login">
                                    <Button className="w-full" size="lg">
                                        Ir para Login
                                    </Button>
                                </Link>
                            </CardContent>
                        </>
                    )}
                    <CardFooter className="flex flex-col space-y-4">
                        {!submitted && (
                            <p className="text-sm text-center text-muted-foreground">
                                Lembrou sua senha?{" "}
                                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                                    Fazer login
                                </Link>
                            </p>
                        )}
                    </CardFooter>
                </Card>

                {/* Back to Home */}
                <div className="text-center">
                    <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        ← Voltar para a página inicial
                    </Link>
                </div>
            </div>
        </div>
    )
}
