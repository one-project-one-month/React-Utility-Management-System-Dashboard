import type { BreadCrumbItem } from "@/types/breadcrumb"
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react"

type Props = {
    items: BreadCrumbItem[]
}


const NavigationBreadCrumbs = ({ items }: Props) => {
    return (
        <Breadcrumbs>
            {items.map((item) => (
                <BreadcrumbItem href={item.href}>{item.label}</BreadcrumbItem>
            ))}
        </Breadcrumbs>
    )
}

export default NavigationBreadCrumbs