"use client"

import { motion, Variants } from "framer-motion"

interface AnimatedLogoProps {
    className?: string
    enableHover?: boolean
}

export const AnimatedLogo = ({ className = "w-16 h-16", enableHover = false }: AnimatedLogoProps) => {
    // 7 points along the bottom arc (0, 30, 60, 90, 120, 150, 180 degrees)
    // Center (50, 50), Radius 25
    const dots = [
        { cx: 75, cy: 50 },          // 0 deg (Right)
        { cx: 71.65, cy: 62.5 },     // 30 deg
        { cx: 62.5, cy: 71.65 },     // 60 deg
        { cx: 50, cy: 75 },          // 90 deg (Bottom)
        { cx: 37.5, cy: 71.65 },     // 120 deg
        { cx: 28.35, cy: 62.5 },     // 150 deg
        { cx: 25, cy: 50 },          // 180 deg (Left)
    ]

    const arcVariants: Variants = {
        hidden: { pathLength: 0 },
        visible: {
            pathLength: 1,
            transition: { duration: 1, ease: "easeInOut", delay: 0.2 }
        }
    }

    const dotVariants = (index: number): Variants => ({
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.3,
                delay: 1.2 + (index * 0.1),
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    })

    const centerVariants: Variants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                duration: 0.5,
                delay: 2.0,
                type: "spring"
            }
        }
    }

    return (
        <motion.svg
            className={className}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial="hidden"
            animate={enableHover ? undefined : "visible"}
            whileHover={enableHover ? "visible" : undefined}
        >
            <defs>
                <linearGradient id="animated_logo_gradient" x1="25" y1="50" x2="75" y2="50" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#818cf8" />
                </linearGradient>
            </defs>

            {/* Top Arc */}
            <motion.path
                d="M25 50C25 36.1929 36.1929 25 50 25C63.8071 25 75 36.1929 75 50"
                stroke="#38bdf8"
                strokeWidth="8"
                strokeLinecap="round"
                variants={arcVariants}
            />

            {/* Bottom Dots (appearing one by one) */}
            {dots.map((dot, index) => (
                <motion.circle
                    key={index}
                    cx={dot.cx}
                    cy={dot.cy}
                    r="4" // Half of strokeWidth 8
                    fill="url(#animated_logo_gradient)"
                    variants={dotVariants(index)}
                />
            ))}

            {/* Center Circle (appears last) */}
            <motion.circle
                cx="50"
                cy="50"
                r="7"
                className="fill-foreground"
                variants={centerVariants}
            />
        </motion.svg>
    )
}
