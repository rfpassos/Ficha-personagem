"use client"

import * as React from "react"
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Types
type Status = "todo" | "in-progress" | "review" | "done"

interface Task {
    id: string
    title: string
    date: string
    assignee: string
    assigneeInitials: string
    status: Status
}

interface Column {
    id: Status
    title: string
    color: string
}

// Initial Data
const initialTasks: Task[] = [
    {
        id: "task-1",
        title: "Implementar Login",
        date: "24/01/2024",
        assignee: "Ana S.",
        assigneeInitials: "AS",
        status: "todo",
    },
    {
        id: "task-2",
        title: "API de Clientes",
        date: "25/01/2024",
        assignee: "Mariana L.",
        assigneeInitials: "ML",
        status: "in-progress",
    },
    {
        id: "task-3",
        title: "Revisão Front-end",
        date: "25/01/2024",
        assignee: "Carlos A.",
        assigneeInitials: "CA",
        status: "review",
    },
]

const columns: Column[] = [
    { id: "todo", title: "A Fazer", color: "bg-pink-500" },
    { id: "in-progress", title: "Em Progresso", color: "bg-yellow-500" },
    { id: "review", title: "Em Revisão", color: "bg-orange-500" },
    { id: "done", title: "Concluído", color: "bg-green-500" },
]

export function KanbanBoard() {
    const [tasks, setTasks] = React.useState<Task[]>(initialTasks)
    const [activeId, setActiveId] = React.useState<string | null>(null)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string)
    }

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveTask = active.data.current?.type === "Task"
        const isOverTask = over.data.current?.type === "Task"
        const isOverColumn = over.data.current?.type === "Column"

        if (!isActiveTask) return

        // Dropping Task over Task
        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId)
                const overIndex = tasks.findIndex((t) => t.id === overId)

                if (tasks[activeIndex].status !== tasks[overIndex].status) {
                    tasks[activeIndex].status = tasks[overIndex].status
                    return arrayMove(tasks, activeIndex, overIndex - 1)
                }

                return arrayMove(tasks, activeIndex, overIndex)
            })
        }

        // Dropping Task over Column
        if (isActiveTask && isOverColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId)
                tasks[activeIndex].status = overId as Status
                return arrayMove(tasks, activeIndex, activeIndex) // Trigger re-render
            })
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveId(null)
    }

    if (!mounted) return null

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-4 pb-4">
                {columns.map((col) => (
                    <Column key={col.id} column={col} tasks={tasks.filter((t) => t.status === col.id)} />
                ))}
            </div>
            <DragOverlay>
                {activeId ? (
                    <TaskCard task={tasks.find((t) => t.id === activeId)!} />
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}

function Column({ column, tasks }: { column: Column; tasks: Task[] }) {
    const { setNodeRef } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
    })

    return (
        <div ref={setNodeRef} className="min-w-[200px] w-[200px] flex flex-col">
            <div className={`${column.color} rounded-t-lg px-3 py-2`}>
                <span className="font-semibold text-white text-sm">{column.title}</span>
            </div>
            <div className="bg-muted/30 rounded-b-lg p-2 space-y-2 min-h-[150px] flex-1">
                <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <SortableTask key={task.id} task={task} />
                    ))}
                </SortableContext>
                {tasks.length === 0 && (
                    <div className="h-full flex items-center justify-center p-4">
                        <p className="text-xs text-muted-foreground text-center">Vazio</p>
                    </div>
                )}
            </div>
        </div>
    )
}

function SortableTask({ task }: { task: Task }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-50"
            >
                <TaskCard task={task} />
            </div>
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskCard task={task} />
        </div>
    )
}

function TaskCard({ task }: { task: Task }) {
    return (
        <Card className="p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow bg-card">
            <p className="text-xs font-medium">{task.title}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{task.date}</p>
            <div className="flex items-center gap-2 mt-2">
                <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[8px]">{task.assigneeInitials}</AvatarFallback>
                </Avatar>
                <span className="text-[10px]">{task.assignee}</span>
            </div>
        </Card>
    )
}
