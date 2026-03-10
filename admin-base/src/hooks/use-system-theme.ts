"use client"

import { useEffect, useState } from "react"

// Types
export type ThemeMode = 'light' | 'dark'

type ThemeValue = string | { light: string; dark: string }

interface ThemeConfig {
    [key: string]: ThemeValue
}

// Default colors
const DEFAULT_THEME: ThemeConfig = {
    // Global Colors (Same for both modes)
    "--primary": "#E91E63",
    "--secondary": "#00BCD4",
    "--success": "#22C55E",
    "--chart-4": "#FFC107",
    "--destructive": "#EF4444",

    // Dual Mode Colors (Distinct for Light/Dark)
    "--background": { light: "#F8FAFC", dark: "#020617" },
    "--card": { light: "#FFFFFF", dark: "#1E293B" },
    "--foreground": { light: "#0F172A", dark: "#F8FAFC" },
    "--muted-foreground": { light: "#64748B", dark: "#94A3B8" },
    "--accent": { light: "#F1F5F9", dark: "#1E293B" }, // Hover/Interaction
}

export type ThemeVariable = keyof typeof DEFAULT_THEME

export function useSystemTheme() {
    const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME)
    const [mounted, setMounted] = useState(false)

    // Load saved theme on mount
    useEffect(() => {
        setMounted(true)
        const savedTheme = localStorage.getItem("system-theme-v2")
        if (savedTheme) {
            try {
                const parsed = JSON.parse(savedTheme)
                // Merge saved theme with defaults to ensure completeness
                const mergedTheme = { ...DEFAULT_THEME, ...parsed }
                setTheme(mergedTheme)
                applyTheme(mergedTheme)
            } catch (e) {
                console.error("Failed to parse saved theme", e)
            }
        } else {
            // Apply default theme if no save found
            applyTheme(DEFAULT_THEME)
        }
    }, [])

    // Generate and inject CSS
    const applyTheme = (currentTheme: ThemeConfig) => {
        const rootVars: string[] = []
        const darkVars: string[] = []

        Object.entries(currentTheme).forEach(([key, value]) => {
            if (typeof value === 'string') {
                // Global variable
                rootVars.push(`${key}: ${value};`)
            } else {
                // Dual variable
                rootVars.push(`${key}: ${value.light};`)
                darkVars.push(`${key}: ${value.dark};`)
            }
        })

        // Also map ring to primary for consistency
        const primary = typeof currentTheme["--primary"] === 'string' ? currentTheme["--primary"] : "#E91E63"
        rootVars.push(`--ring: ${primary};`)

        const css = `
            :root {
                ${rootVars.join('\n')}
            }
            .dark {
                ${darkVars.join('\n')}
            }
        `

        // Inject into head
        let styleTag = document.getElementById('theme-dynamic-styles')
        if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.id = 'theme-dynamic-styles'
            document.head.appendChild(styleTag)
        }
        styleTag.innerHTML = css
    }

    const updateColor = (variable: ThemeVariable, value: string, mode?: ThemeMode) => {
        const updatedTheme = { ...theme }
        const currentValue = updatedTheme[variable]

        if (mode && typeof currentValue === 'object') {
            // Update specific mode of a dual variable
            updatedTheme[variable] = { ...currentValue, [mode]: value }
        } else {
            // Update global variable or overwrite dual with single (should generally avoid this for duals)
            // If it's a global variable, just set the string
            updatedTheme[variable] = value
        }

        setTheme(updatedTheme)
        applyTheme(updatedTheme)
        localStorage.setItem("system-theme-v2", JSON.stringify(updatedTheme))
    }

    const resetTheme = () => {
        setTheme(DEFAULT_THEME)
        applyTheme(DEFAULT_THEME)
        localStorage.removeItem("system-theme-v2")
    }

    return {
        theme,
        updateColor,
        resetTheme,
        defaults: DEFAULT_THEME,
        isDual: (variable: ThemeVariable) => typeof DEFAULT_THEME[variable] !== 'string'
    }
}
