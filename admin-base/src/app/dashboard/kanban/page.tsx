"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, GripVertical } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    DndContext,
    DragOverlay,
    closestCorners,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
    useDroppable,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

// Types
interface Task {
    id: string
    title: string
    date: string
    responsible: {
        name: string
        avatar?: string
        initials: string
    }
}

interface Column {
    id: string
    title: string
    color: string
    tasks: Task[]
}

// Initial Data
const initialColumns: Column[] = [
    {
        id: "todo",
        title: "A Fazer",
        color: "bg-pink-500",
        tasks: [
            {
                id: "task-1",
                title: "Implementar Login Social",
                date: "24/01/2024",
                responsible: { name: "Ana S.", initials: "AS", avatar: "https://i.pravatar.cc/150?img=1" }
            },
            {
                id: "task-2",
                title: "Refatorar Componente X",
                date: "26/01/2024",
                responsible: { name: "João M.", initials: "JM", avatar: "https://i.pravatar.cc/150?img=3" }
            },
            {
                id: "task-3",
                title: "Criar Testes Unitários",
                date: "28/01/2024",
                responsible: { name: "Pedro C.", initials: "PC", avatar: "https://i.pravatar.cc/150?img=5" }
            },
        ]
    },
    {
        id: "in-progress",
        title: "Em Progresso",
        color: "bg-yellow-500",
        tasks: [
            {
                id: "task-4",
                title: "Desenvolver API de Clientes",
                date: "25/01/2024",
                responsible: { name: "Mariana L.", initials: "ML", avatar: "https://i.pravatar.cc/150?img=2" }
            },
            {
                id: "task-5",
                title: "Integrar Gateway de Pagamento",
                date: "27/01/2024",
                responsible: { name: "Ricardo F.", initials: "RF", avatar: "https://i.pravatar.cc/150?img=4" }
            },
            {
                id: "task-6",
                title: "Otimizar Banco de Dados",
                date: "29/01/2024",
                responsible: { name: "Sofia B.", initials: "SB", avatar: "https://i.pravatar.cc/150?img=6" }
            },
        ]
    },
    {
        id: "review",
        title: "Em Revisão",
        color: "bg-orange-500",
        tasks: [
            {
                id: "task-7",
                title: "Revisão de Código Front-end",
                date: "25/01/2024",
                responsible: { name: "Carlos A.", initials: "CA", avatar: "https://i.pravatar.cc/150?img=7" }
            },
            {
                id: "task-8",
                title: "Documentação da API",
                date: "26/01/2024",
                responsible: { name: "Beatriz G.", initials: "BG", avatar: "https://i.pravatar.cc/150?img=8" }
            },
            {
                id: "task-9",
                title: "Ajustes de UI/UX",
                date: "28/01/2024",
                responsible: { name: "Felipe D.", initials: "FD", avatar: "https://i.pravatar.cc/150?img=9" }
            },
        ]
    },
    {
        id: "done",
        title: "Concluído",
        color: "bg-green-500",
        tasks: []
    },
]

// Sortable Task Card Component
function SortableTaskCard({ task }: { task: Task }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`select-none ${isDragging ? 'z-50' : ''}`}
        >
            <Card className={`group bg-card hover:border-primary/50 transition-colors ${isDragging ? 'shadow-lg ring-2 ring-primary' : ''}`}>
                <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2 flex-1">
                            <button
                                {...attributes}
                                {...listeners}
                                className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
                                type="button"
                            >
                                <GripVertical className="h-4 w-4" />
                            </button>
                            <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity -mr-2 -mt-1"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem>Mover</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">{task.date}</p>
                    <div className="flex items-center justify-between pt-1 pl-6">
                        <div>
                            <p className="text-xs text-muted-foreground">Responsável</p>
                            <p className="text-sm font-medium">{task.responsible.name}</p>
                        </div>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={task.responsible.avatar} />
                            <AvatarFallback className="text-xs bg-primary/20 text-primary">
                                {task.responsible.initials}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// Task Card for Drag Overlay
function TaskCardOverlay({ task }: { task: Task }) {
    return (
        <Card className="bg-card shadow-xl ring-2 ring-primary w-[276px]">
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-2">
                    <GripVertical className="h-4 w-4 mt-1 text-muted-foreground" />
                    <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground pl-6">{task.date}</p>
                <div className="flex items-center justify-between pt-1 pl-6">
                    <div>
                        <p className="text-xs text-muted-foreground">Responsável</p>
                        <p className="text-sm font-medium">{task.responsible.name}</p>
                    </div>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={task.responsible.avatar} />
                        <AvatarFallback className="text-xs bg-primary/20 text-primary">
                            {task.responsible.initials}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </CardContent>
        </Card>
    )
}

// Droppable Column Component
function DroppableColumn({ column, tasks }: { column: Omit<Column, 'tasks'>; tasks: Task[] }) {
    const { setNodeRef, isOver } = useDroppable({
        id: column.id,
    })

    return (
        <div className="flex flex-col min-w-[300px] w-[300px] shrink-0">
            {/* Column Header */}
            <div className={`${column.color} rounded-t-lg px-4 py-3`}>
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{column.title}</h3>
                    <span className="text-white/80 text-sm">{tasks.length}</span>
                </div>
            </div>

            {/* Column Content - This is the droppable area */}
            <div
                ref={setNodeRef}
                className={`flex-1 bg-muted/30 rounded-b-lg p-3 space-y-3 min-h-[400px] transition-colors ${isOver ? 'bg-primary/10 ring-2 ring-primary ring-inset' : ''}`}
            >
                {/* Add Task Button */}
                <Button
                    variant="ghost"
                    className="w-full border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 hover:bg-transparent text-muted-foreground hover:text-primary mb-2"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Tarefa
                </Button>


                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <SortableTaskCard key={task.id} task={task} />
                    ))}
                </SortableContext>

                {tasks.length === 0 && (
                    <div className={`flex items-center justify-center h-20 border-2 border-dashed rounded-lg text-sm transition-colors ${isOver ? 'border-primary text-primary' : 'border-muted-foreground/20 text-muted-foreground'}`}>
                        Arraste tarefas aqui
                    </div>
                )}


            </div>
        </div>
    )
}

export default function KanbanPage() {
    const [columns, setColumns] = useState<Column[]>(initialColumns)
    const [activeTask, setActiveTask] = useState<Task | null>(null)
    const [isMounted, setIsMounted] = useState(false)
    const lastOverId = useRef<string | null>(null)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    )

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        lastOverId.current = null

        for (const col of columns) {
            const task = col.tasks.find(t => t.id === active.id)
            if (task) {
                setActiveTask(task)
                break
            }
        }
    }

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id as string
        const overId = over.id as string

        // Prevent duplicate processing
        if (lastOverId.current === overId) return
        if (activeId === overId) return

        const isOverColumn = columns.some(col => col.id === overId)
        const activeColumnIndex = columns.findIndex(col => col.tasks.some(t => t.id === activeId))

        let overColumnIndex: number
        if (isOverColumn) {
            overColumnIndex = columns.findIndex(col => col.id === overId)
        } else {
            overColumnIndex = columns.findIndex(col => col.tasks.some(t => t.id === overId))
        }

        if (activeColumnIndex === -1 || overColumnIndex === -1) return
        if (activeColumnIndex === overColumnIndex) return

        lastOverId.current = overId

        setColumns(prev => {
            const activeColumn = prev[activeColumnIndex]
            const overColumn = prev[overColumnIndex]

            const activeTask = activeColumn.tasks.find(t => t.id === activeId)
            if (!activeTask) return prev

            const overTaskIndex = isOverColumn ? -1 : overColumn.tasks.findIndex(t => t.id === overId)

            const newColumns = [...prev]

            // Remove from source
            newColumns[activeColumnIndex] = {
                ...activeColumn,
                tasks: activeColumn.tasks.filter(t => t.id !== activeId)
            }

            // Add to destination
            const destTasks = [...overColumn.tasks]
            const insertIndex = overTaskIndex >= 0 ? overTaskIndex : destTasks.length
            destTasks.splice(insertIndex, 0, activeTask)

            newColumns[overColumnIndex] = {
                ...overColumn,
                tasks: destTasks
            }

            return newColumns
        })
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        setActiveTask(null)
        lastOverId.current = null

        if (!over) return

        const activeId = active.id as string
        const overId = over.id as string

        if (activeId === overId) return

        const isOverColumn = columns.some(col => col.id === overId)
        if (isOverColumn) return

        const activeColumnIndex = columns.findIndex(col => col.tasks.some(t => t.id === activeId))
        if (activeColumnIndex === -1) return

        const activeColumn = columns[activeColumnIndex]
        const overIndex = activeColumn.tasks.findIndex(t => t.id === overId)
        const activeIndex = activeColumn.tasks.findIndex(t => t.id === activeId)

        if (overIndex >= 0 && activeIndex >= 0 && overIndex !== activeIndex) {
            setColumns(prev => {
                const newColumns = [...prev]
                newColumns[activeColumnIndex] = {
                    ...prev[activeColumnIndex],
                    tasks: arrayMove(prev[activeColumnIndex].tasks, activeIndex, overIndex)
                }
                return newColumns
            })
        }
    }

    if (!isMounted) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
                        <p className="text-muted-foreground">Arraste os cards para mover entre colunas</p>
                    </div>

                </div>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {initialColumns.map((column) => (
                        <div key={column.id} className="flex flex-col min-w-[300px] w-[300px] shrink-0">
                            <div className={`${column.color} rounded-t-lg px-4 py-3`}>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-white">{column.title}</h3>
                                    <span className="text-white/80 text-sm">{column.tasks.length}</span>
                                </div>
                            </div>
                            <div className="flex-1 bg-muted/30 rounded-b-lg p-3 min-h-[400px] animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
                    <p className="text-muted-foreground">Arraste os cards para mover entre colunas</p>
                </div>

            </div>

            {/* Kanban Board */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {columns.map((column) => (
                        <DroppableColumn
                            key={column.id}
                            column={{ id: column.id, title: column.title, color: column.color }}
                            tasks={column.tasks}
                        />
                    ))}

                    {/* Add Column Button */}
                    <div className="min-w-[300px] w-[300px] shrink-0">
                        <Button
                            variant="outline"
                            className="w-full h-12 border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 text-muted-foreground hover:text-primary"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar Coluna
                        </Button>
                    </div>
                </div>

                <DragOverlay dropAnimation={null}>
                    {activeTask ? <TaskCardOverlay task={activeTask} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}
