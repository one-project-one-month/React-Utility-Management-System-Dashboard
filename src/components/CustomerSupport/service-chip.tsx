import type { Category, Priority, Status } from "@/types/customer-service"
import { Chip } from "@heroui/react"

type ChipVariant = 'solid' | 'bordered' | 'flat'
type ChipColor = 'success' | 'danger' | 'warning' | 'primary' | 'secondary' | 'default'

type Label = Category | Status | Priority

const statusValues: Label[] = ['Resolved', 'Ongoing', 'Pending']
const isStatus = (label: Label) => statusValues.includes(label);

const priorityValues: Label[] = ['High', 'Medium', 'Low']
const isPriority = (label: Label) => priorityValues.includes(label);

const categoryValues: Label[] = ['Complain', 'Maintenance', 'Other']
const isCategory = (label: Label) => categoryValues.includes(label);

const colorMap: Record<Label, ChipColor> = {
    // === Statuses ===
    'Resolved': 'success',
    'Ongoing': 'primary',
    'Pending': 'secondary',

    // === Priorities ===
    'High': 'danger',
    'Medium': 'warning',
    'Low': 'default',

    // === Categories ===
    'Complain': 'warning',
    'Maintenance': 'primary',
    'Other': 'secondary',
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