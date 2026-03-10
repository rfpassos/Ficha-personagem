import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import { AnimatedLogo } from "@/components/layout/animated-logo"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
            <div className="mx-auto flex w-full max-w-md flex-col items-center text-center space-y-8">

                {/* Branding Element */}
                <div className="relative flex items-center justify-center p-8">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-20 rounded-full" />
                    <AnimatedLogo className="w-32 h-32 relative z-10" />
                </div>

                {/* Typography */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                        Você saiu do Loop.
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        ...e caiu em um <span className="text-primary font-medium">Território Inexplorado</span>.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
                    <Link href="/dashboard">
                        <Button size="lg" className="w-full sm:w-auto gap-2 min-w-[160px]">
                            <Home className="h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>

                    <Link href="/">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 min-w-[160px]">
                            <ArrowLeft className="h-4 w-4" />
                            Voltar
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
