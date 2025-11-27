import { Skeleton } from "@heroui/react";

type SkeletonLoaderProps = {
   height?: number | string;
   width?: number | string;
   rounded?: string;
   className?: string;
};

export const SkeletonLoader = ({
   height = "6rem", // default = 24 * 4px
   width = "100%",
   rounded = "rounded-lg",
   className = "",
}: SkeletonLoaderProps) => {
   return (
      <Skeleton className={`${rounded} ${className}`}>
         <div className="bg-default-300" style={{ height, width }} />
      </Skeleton>
   );
};
