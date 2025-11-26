import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  hasPreviousRooms: boolean;
  hasMoreRooms: boolean;
  isFetching: boolean;
  handleLoadPrevious: () => void;
  handleLoadMore: () => void;
}
export default function LoadRoomsButtons({
  hasPreviousRooms,
  hasMoreRooms,
  isFetching,
  handleLoadPrevious,
  handleLoadMore,
}: Props) {
  return (
    <div className="flex justify-end  gap-1 items-center">
      {hasPreviousRooms && (
        <Tooltip content="Previous rooms" placement="bottom">
          <Button
            type="button"
            color="primary"
            onPress={handleLoadPrevious}
            isDisabled={isFetching}
            isIconOnly
            size="sm"
            variant="light"
            className="w-4 h-5"
            radius="full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Tooltip>
      )}

      {hasMoreRooms && (
        <Tooltip content="Next rooms" placement="bottom">
          <Button
            type="button"
            color={"primary"}
            onPress={handleLoadMore}
            isDisabled={isFetching}
            isIconOnly
            size="sm"
            variant="light"
            className="w-4 h-5"
            radius="sm"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
