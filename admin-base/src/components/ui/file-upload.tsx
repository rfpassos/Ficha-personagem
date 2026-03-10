"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Upload, X, File as FileIcon, Image as ImageIcon, FileText, FileVideo, FileAudio, FileJson, FileType, FileSpreadsheet, FileLock, FileArchive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ImageCropper } from "@/components/ui/image-cropper"

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
    onFilesChange?: (files: File[]) => void
    accept?: string
    multiple?: boolean
    maxSize?: number // in MB
    maxFiles?: number
    disabled?: boolean
    showPreview?: boolean
    crop?: boolean
    cropAspectRatio?: number
    cropLabel?: string
}

interface UploadedFile {
    file: File
    id: string
    progress: number
    preview?: string
}

const getFileIcon = (file: File) => {
    const type = file.type
    const name = file.name
    const extension = name.split('.').pop()?.toLowerCase() || ''

    // Media types
    if (type.startsWith("image/")) return ImageIcon
    if (type.startsWith("video/")) return FileVideo
    if (type.startsWith("audio/")) return FileAudio

    // Specific mappings requested
    if (type.includes("pdf")) return FileLock

    // Archives / Compressed
    if (type.includes("zip") || type.includes("compressed") || type.includes("archive") || ['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) return FileArchive

    // Spreadsheets
    if (type.includes("spreadsheet") || type.includes("excel") || ['csv', 'xls', 'xlsx'].includes(extension)) return FileSpreadsheet

    // Code (using FileJson for 'file-braces' visual)
    if (type.includes("json") || type.includes("html") || type.includes("css") || type.includes("javascript") || type.includes("xml") || ['html', 'htm', 'css', 'js', 'jsx', 'ts', 'tsx', 'xml', 'json', 'py', 'java', 'c', 'cpp'].includes(extension)) return FileJson

    // Text / Markdown
    if (['txt', 'md', 'rtf'].includes(extension) || type.startsWith("text/")) return FileText

    // Documents (Word, etc) - using FileType
    if (type.includes("document") || type.includes("msword") || ['doc', 'docx', 'odt'].includes(extension)) return FileType

    return FileIcon
}

const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
    (
        {
            className,
            onFilesChange,
            accept = "*",
            multiple = true,
            maxSize = 10, // 10MB default
            maxFiles = 5,
            disabled = false,
            showPreview = true,
            crop = false,
            cropAspectRatio,
            cropLabel,
            ...props
        },
        ref
    ) => {
        const [files, setFiles] = React.useState<UploadedFile[]>([])
        const [isDragging, setIsDragging] = React.useState(false)
        const [error, setError] = React.useState<string | null>(null)
        const inputRef = React.useRef<HTMLInputElement>(null)

        // Cropping State
        const [cropQueue, setCropQueue] = React.useState<File[]>([])
        const [currentCropFile, setCurrentCropFile] = React.useState<File | null>(null)
        const [cropperOpen, setCropperOpen] = React.useState(false)
        const [processedFiles, setProcessedFiles] = React.useState<File[]>([])

        // Effect to handle the crop queue
        React.useEffect(() => {
            if (cropQueue.length > 0 && !currentCropFile && !cropperOpen) {
                const nextFile = cropQueue[0]
                setCropQueue((prev) => prev.slice(1))
                setCurrentCropFile(nextFile)
                setCropperOpen(true)
            } else if (cropQueue.length === 0 && !currentCropFile && !cropperOpen && processedFiles.length > 0) {
                // All done cropping
                finalizeUpload(processedFiles)
                setProcessedFiles([])
            }
        }, [cropQueue, currentCropFile, cropperOpen, processedFiles])


        const handleCropComplete = (croppedBlob: Blob) => {
            if (!currentCropFile) return

            const croppedFile = new File([croppedBlob], currentCropFile.name, {
                type: currentCropFile.type,
                lastModified: Date.now(),
            })

            setProcessedFiles(prev => [...prev, croppedFile])
            setCropperOpen(false)
            setCurrentCropFile(null)
        }

        const finalizeUpload = (finalFiles: File[]) => {
            const uploadedFiles: UploadedFile[] = finalFiles.map((file) => ({
                file,
                id: Math.random().toString(36).substr(2, 9),
                progress: 100,
                preview: file.type.startsWith("image/")
                    ? URL.createObjectURL(file)
                    : undefined,
            }))

            const newFileList = [...files, ...uploadedFiles]
            setFiles(newFileList)
            onFilesChange?.(newFileList.map((f) => f.file))
        }

        const handleFiles = React.useCallback(
            (newFiles: FileList | null) => {
                if (!newFiles || disabled) return
                setError(null)

                const fileArray = Array.from(newFiles)

                // Validate max files
                if (files.length + fileArray.length > maxFiles) {
                    setError(`Máximo de ${maxFiles} arquivos permitidos`)
                    return
                }

                // Validate file sizes
                const oversizedFiles = fileArray.filter(
                    (f) => f.size > maxSize * 1024 * 1024
                )
                if (oversizedFiles.length > 0) {
                    setError(`Arquivos devem ter no máximo ${maxSize}MB`)
                    return
                }

                if (crop) {
                    // Filter images for cropping
                    const imagesToCrop = fileArray.filter(f => f.type.startsWith('image/'))
                    const otherFiles = fileArray.filter(f => !f.type.startsWith('image/'))

                    if (imagesToCrop.length > 0) {
                        setCropQueue(imagesToCrop)
                        // Add non-images immediately to processed list (or handle them separately, but simplest is to mix)
                        setProcessedFiles(otherFiles)
                    } else {
                        finalizeUpload(otherFiles)
                    }
                } else {
                    finalizeUpload(fileArray)
                }
            },
            [files, maxFiles, maxSize, disabled, crop]
        )

        const removeFile = React.useCallback(
            (id: string) => {
                const file = files.find((f) => f.id === id)
                if (file?.preview) {
                    URL.revokeObjectURL(file.preview)
                }
                const newFiles = files.filter((f) => f.id !== id)
                setFiles(newFiles)
                onFilesChange?.(newFiles.map((f) => f.file))
            },
            [files, onFilesChange]
        )

        const handleDragOver = React.useCallback(
            (e: React.DragEvent) => {
                e.preventDefault()
                if (!disabled) setIsDragging(true)
            },
            [disabled]
        )

        const handleDragLeave = React.useCallback((e: React.DragEvent) => {
            e.preventDefault()
            setIsDragging(false)
        }, [])

        const handleDrop = React.useCallback(
            (e: React.DragEvent) => {
                e.preventDefault()
                setIsDragging(false)
                handleFiles(e.dataTransfer.files)
            },
            [handleFiles]
        )

        const handleClick = () => {
            if (!disabled) inputRef.current?.click()
        }

        // Cleanup previews on unmount
        React.useEffect(() => {
            return () => {
                files.forEach((f) => {
                    if (f.preview) URL.revokeObjectURL(f.preview)
                })
            }
        }, [])

        return (
            <div ref={ref} className={cn("space-y-4", className)} {...props}>
                {/* Drop Zone */}
                <div
                    onClick={handleClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        "relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-colors cursor-pointer",
                        isDragging
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
                        disabled && "cursor-not-allowed opacity-50"
                    )}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        multiple={multiple}
                        onChange={(e) => handleFiles(e.target.files)}
                        className="hidden"
                        disabled={disabled}
                    />

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <Upload className="h-6 w-6 text-primary" />
                    </div>

                    <div className="text-center">
                        <p className="text-sm font-medium">
                            Arraste arquivos aqui ou{" "}
                            <span className="text-primary">clique para selecionar</span>
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            {accept === "*" ? "Qualquer tipo de arquivo" : accept} • Máximo{" "}
                            {maxSize}MB por arquivo
                        </p>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-sm text-destructive">{error}</p>
                )}

                {/* Cropper Modal */}
                {currentCropFile && (
                    <ImageCropper
                        open={cropperOpen}
                        onOpenChange={(open) => {
                            if (!open) {
                                // If closed without saving, skip this file or cancel batch? 
                                // Decision: Skip this file, continue queue.
                                setCropperOpen(false)
                                setCurrentCropFile(null)
                            } else {
                                setCropperOpen(open)
                            }
                        }}
                        imageSrc={URL.createObjectURL(currentCropFile)}
                        onCropComplete={handleCropComplete}
                        aspect={cropAspectRatio}
                        cropLabel={cropLabel}
                    />
                )}

                {/* File List */}
                {showPreview && files.length > 0 && (
                    <div className="space-y-2">
                        {files.map((uploadedFile) => {
                            const FileIcon = getFileIcon(uploadedFile.file)

                            return (
                                <div
                                    key={uploadedFile.id}
                                    className="flex items-center gap-3 rounded-lg border bg-card p-3"
                                >
                                    {/* Preview or Icon */}
                                    {uploadedFile.preview ? (
                                        <img
                                            src={uploadedFile.preview}
                                            alt={uploadedFile.file.name}
                                            className="h-12 w-12 rounded-md object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                                            <FileIcon className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                    )}

                                    {/* File Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {uploadedFile.file.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatFileSize(uploadedFile.file.size)}
                                        </p>
                                        {uploadedFile.progress < 100 && (
                                            <Progress value={uploadedFile.progress} className="h-1 mt-1" />
                                        )}
                                    </div>

                                    {/* Remove Button */}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 shrink-0"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeFile(uploadedFile.id)
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }
)
FileUpload.displayName = "FileUpload"

export { FileUpload }
