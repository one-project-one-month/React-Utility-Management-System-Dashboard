import type { Links, Meta } from "./metadata";

export interface ApiResponse<T> {
   success: boolean;
   message: string;
   content: {
      data: T;
      meta?: Meta;
      links?: Links;
   };
   status: number;
}
