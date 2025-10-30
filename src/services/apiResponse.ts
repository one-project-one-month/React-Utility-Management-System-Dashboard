import type { Links, Meta } from "./pagination"

export interface ApiResponse<T> {
    success: boolean
    message: string
    content: {
        data: T
        meta?: Meta
        links?: Links
    }
    status: number
}