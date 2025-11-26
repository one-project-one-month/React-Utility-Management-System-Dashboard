import { type FallbackProps } from "react-error-boundary";
import { Button, Card, CardBody } from "@heroui/react";
import {
  AlertTriangle,
  RefreshCcw,
  Home,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background text-foreground p-6">
      <Card className="max-w-lg w-full shadow-xl border border-default rounded-2xl">
        <CardBody className="flex flex-col items-center justify-center text-center space-y-5 p-8">
          <div className="p-4 rounded-full bg-danger/10 text-danger">
            <AlertTriangle className="h-10 w-10" />
          </div>

          <h2 className="text-2xl font-bold">Something went wrong!</h2>

          <div className="w-full bg-danger-50 border border-danger-200 rounded-lg p-4 text-left">
            <p className="text-sm font-medium text-danger-600">
              {error.name}:{" "}
              <span className="text-danger-700">{error.message}</span>
            </p>
          </div>

          <Button
            variant="light"
            size="sm"
            onPress={() => setShowDetails(!showDetails)}
            endContent={
              showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            }
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>

          {showDetails && error.stack && (
            <div className="w-full bg-default-100 border border-default-200 rounded-lg p-4">
              <p className="text-sm font-semibold mb-2">Stack Trace:</p>
              <pre className="text-xs text-default-600 overflow-auto max-h-40 bg-default-50 p-3 rounded border">
                {error.stack}
              </pre>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              color="primary"
              startContent={<RefreshCcw size={16} />}
              onPress={resetErrorBoundary}
            >
              Try Again
            </Button>

            <Button
              color="secondary"
              variant="flat"
              startContent={<Home size={16} />}
              onPress={() => {
                navigate(-1);
                setTimeout(() => resetErrorBoundary(), 100);
              }}
            >
              Return to Latest Page
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
