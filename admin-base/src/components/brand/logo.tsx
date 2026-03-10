import { cn } from "@/lib/utils"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg"
    variant?: "icon" | "full"
}

export function LoopStudioLogo({ size = "md", variant = "full", className, ...props }: LogoProps) {
    const dimensions = {
        sm: { w: 32, h: 32, text: "text-xl" },
        md: { w: 48, h: 48, text: "text-2xl" },
        lg: { w: 64, h: 64, text: "text-4xl" },
    }

    const { w, h, text } = dimensions[size]

    return (
        <div className={cn("flex items-center gap-3 font-bold leading-none tracking-tight", className)} {...props}>
            <div className="relative" style={{ width: w, height: h }}>
                <svg
                    className="w-full h-full drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M25 50C25 36.1929 36.1929 25 50 25C63.8071 25 75 36.1929 75 50"
                        stroke="currentColor"
                        className="text-sky-400"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    <path
                        d="M75 50C75 63.8071 63.8071 75 50 75C36.1929 75 25 63.8071 25 50"
                        stroke="url(#logo_gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="1 12"
                    />
                    <defs>
                        <linearGradient
                            id="logo_gradient"
                            x1="25"
                            y1="50"
                            x2="75"
                            y2="50"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#38bdf8" />
                            <stop offset="1" stopColor="#818cf8" />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="7" className="fill-foreground" />
                </svg>
            </div>
            {variant === "full" && (
                <span className={cn(text)}>
                    Loop Studio <span className="bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent">IA</span>
                </span>
            )}
        </div>
    )
}
