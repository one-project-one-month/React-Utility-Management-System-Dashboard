export type BreadCrumbItem = {
    label: string
    href: string | null
}

export type BreadCrumbs = {
    [key: string]: BreadCrumbItem[]
}