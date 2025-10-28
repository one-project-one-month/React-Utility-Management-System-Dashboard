import { useState } from "react";

export function useFakeLoading(): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return [isLoading, setIsLoading];
}
