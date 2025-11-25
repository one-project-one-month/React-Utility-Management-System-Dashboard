import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode } from "react";
import ErrorFallback from "@/components/ErrorBoundary/error-fall-back";

interface Props {
  children: ReactNode;
}

export default function CustomErrorBoundary({ children }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={ErrorFallback}
          onError={(error, info) => {
            console.error("Caught by FP ErrorBoundary:", error, info);
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
