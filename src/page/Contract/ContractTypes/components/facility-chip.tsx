import { Chip } from "@heroui/react";
import { Airplay, Box, Tv, Wifi, Refrigerator } from "lucide-react";

interface FacilityChipProps {
    facility: string;
}

const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
        case "air conditioner":
            return <Airplay size={16} />;
        case "television":
            return <Tv size={16} />;
        case "wi-fi":
            return <Wifi size={16} />;
        case "refrigerator":
            return <Refrigerator size={16} />;
        default:
            return <Box size={16} />;
    }
};

const FacilityChip = ({ facility }: FacilityChipProps) => {
    const icon = getFacilityIcon(facility);
    return (
        <Chip
            color="secondary"
            variant="solid"
            className="flex items-center gap-1 px-2 py-1 text-xs"
            startContent={icon}
        >
            {facility}
        </Chip>
    )
}

export default FacilityChip