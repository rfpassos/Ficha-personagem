"use client"

import * as React from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AlertTriangle, Trash2, Info, CheckCircle, XCircle } from "lucide-react"

type ConfirmDialogVariant = "default" | "destructive" | "warning" | "success"

interface ConfirmDialogProps {
    trigger?: React.ReactNode
    title: string
    description?: string
    confirmText?: string
    cancelText?: string
    variant?: ConfirmDialogVariant
    onConfirm?: () => void | Promise<void>
    onCancel?: () => void
    open?: boolean
    onOpenChange?: (open: boolean) => void
    loading?: boolean
}

const variantConfig = {
    default: {
        icon: Info,
        iconColor: "text-primary",
        iconBg: "bg-primary/10",
        confirmVariant: "default" as const,
    },
    destructive: {
        icon: Trash2,
        iconColor: "text-destructive",
        iconBg: "bg-destructive/10",
        confirmVariant: "destructive" as const,
    },
    warning: {
        icon: AlertTriangle,
        iconColor: "text-amber-500",
        iconBg: "bg-amber-500/10",
        confirmVariant: "default" as const,
    },
    success: {
        icon: CheckCircle,
        iconColor: "text-green-500",
        iconBg: "bg-green-500/10",
        confirmVariant: "default" as const,
    },
}

const ConfirmDialog = React.forwardRef<HTMLDivElement, ConfirmDialogProps>(
    (
        {
            trigger,
            title,
            description,
            confirmText = "Confirmar",
            cancelText = "Cancelar",
            variant = "default",
            onConfirm,
            onCancel,
            open,
            onOpenChange,
            loading = false,
        },
        ref
    ) => {
        const [internalOpen, setInternalOpen] = React.useState(false)
        const [isLoading, setIsLoading] = React.useState(false)

        const isControlled = open !== undefined
        const isOpen = isControlled ? open : internalOpen
        const setOpen = isControlled ? onOpenChange : setInternalOpen

        const config = variantConfig[variant]
        const Icon = config.icon

        const handleConfirm = async () => {
            if (onConfirm) {
                setIsLoading(true)
                try {
                    await onConfirm()
                } finally {
                    setIsLoading(false)
                }
            }
            setOpen?.(false)
        }

        const handleCancel = () => {
            onCancel?.()
            setOpen?.(false)
        }

        return (
            <AlertDialog open={isOpen} onOpenChange={setOpen}>
                {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
                <AlertDialogContent ref={ref as React.Ref<HTMLDivElement>}>
                    <AlertDialogHeader>
                        <div className="flex items-start gap-4">
                            <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full", config.iconBg)}>
                                <Icon className={cn("h-6 w-6", config.iconColor)} />
                            </div>
                            <div>
                                <AlertDialogTitle>{title}</AlertDialogTitle>
                                {description && (
                                    <AlertDialogDescription className="mt-2">
                                        {description}
                                    </AlertDialogDescription>
                                )}
                            </div>
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel} disabled={isLoading || loading}>
                            {cancelText}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirm}
                            disabled={isLoading || loading}
                            className={cn(
                                variant === "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            )}
                        >
                            {(isLoading || loading) ? "Aguarde..." : confirmText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }
)
ConfirmDialog.displayName = "ConfirmDialog"

// Hook for programmatic usage
function useConfirmDialog() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [config, setConfig] = React.useState<Omit<ConfirmDialogProps, "open" | "onOpenChange">>({
        title: "",
    })
    const resolveRef = React.useRef<((value: boolean) => void) | null>(null)

    const confirm = React.useCallback(
        (options: Omit<ConfirmDialogProps, "open" | "onOpenChange" | "onConfirm" | "onCancel">) => {
            return new Promise<boolean>((resolve) => {
                resolveRef.current = resolve
                setConfig({
                    ...options,
                    onConfirm: () => {
                        resolveRef.current?.(true)
                        resolveRef.current = null
                    },
                    onCancel: () => {
                        resolveRef.current?.(false)
                        resolveRef.current = null
                    },
                })
                setIsOpen(true)
            })
        },
        []
    )

    const DialogComponent = React.useMemo(
        () => (
            <ConfirmDialog
                {...config}
                open={isOpen}
                onOpenChange={(open) => {
                    setIsOpen(open)
                    if (!open) {
                        resolveRef.current?.(false)
                        resolveRef.current = null
                    }
                }}
            />
        ),
        [isOpen, config]
    )

    return { confirm, ConfirmDialogComponent: DialogComponent }
}

export { ConfirmDialog, useConfirmDialog }
