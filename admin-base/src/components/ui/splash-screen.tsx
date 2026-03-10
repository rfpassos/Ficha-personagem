"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { AnimatedLogo } from "@/components/layout/animated-logo"

export function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Simula um tempo de carregamento inicial ou verificação de sessão
        // Em produção, você pode checar se já mostrou isso na sessão via sessionStorage
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 3000) // Mais tempo para a sequência completa (Arco -> Bolinhas -> Centro)

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="splash-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
                >
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1], // Custom spring-like bezier
                            }}
                            className="relative flex items-center justify-center w-32 h-32 rounded-3xl bg-primary/5"
                        >
                            <AnimatedLogo className="w-16 h-16" />

                            {/* Efeito de Pulse sutil */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                    delay: 1
                                }}
                                className="absolute inset-0 rounded-3xl bg-primary/10"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="text-center"
                        >
                            <h1 className="text-2xl font-bold tracking-tight">Loop Studio</h1>
                            <p className="text-sm text-muted-foreground mt-1">Carregando experiência...</p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
