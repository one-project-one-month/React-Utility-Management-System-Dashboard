import type { Category, Priority, Status } from "@/types/customer-service"
import { Chip } from "@heroui/react"

type ChipVariant = 'solid' | 'bordered' | 'flat'
type ChipColor = 'success' | 'danger' | 'warning' | 'primary' | 'secondary' | 'default'

type Label = Category | Status | Priority

const statusValues: Label[] = ['resolved', 'ongoing', 'pending']
const isStatus = (label: Label) => statusValues.includes(label);

const priorityValues: Label[] = ['high', 'medium', 'low']
const isPriority = (label: Label) => priorityValues.includes(label);

const categoryValues: Label[] = ['complain', 'maintenance', 'other']
const isCategory = (label: Label) => categoryValues.includes(label);

const colorMap: Record<Label, ChipColor> = {
    // === Statuses ===
    'resolved': 'success',
    'ongoing': 'primary',
    'pending': 'secondary',

    // === Priorities ===
    'high': 'danger',
    'medium': 'warning',
    'low': 'default',

    // === Categories ===
    'complain': 'warning',
    'maintenance': 'primary',
    'other': 'secondary',
}

interface ServiceChipProps {
    label: Label
}

export function ServiceChip({ label }: ServiceChipProps) {
    const color = colorMap[label] || 'default'

    let variant: ChipVariant = 'solid';

    if (isCategory(label)) {
        variant = 'solid'
    } else if (isStatus(label)) {
        variant = 'bordered'
    } else if (isPriority(label)) {
        variant = 'flat'
    }

    return <Chip color={color} variant={variant}>{label}</Chip>
}