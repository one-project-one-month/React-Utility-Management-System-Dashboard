import { Download, Home, Layers, MapPin, Pencil, Trash2 } from "lucide-react";
import { Button } from "@heroui/button";
import { useNavigate, useParams } from "react-router";
import { RoomChip } from "@/components/Room/room-chip.tsx";
import { roomMockData } from "@/constants/roomMockData.ts";
import { InfoRow } from "@/components/Room/room-info";
import { RoomCard } from "@/components/Room/room-card.tsx";

function formatCurrency(amount: number, currency = "MMK") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export default function RoomDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = roomMockData.find((room) => room.id === id);

  if (!room) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Room Not Found</h1>
          <Button onPress={() => navigate("/room")}>Back to Rooms</Button>
        </div>
      </div>
    );
  }

  const handleEditRoom = () => {
    navigate(`/room/${id}/edit`);
  };

  return (
    <div className={"p-8 space-y-4"}>
      <div
        className={
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        }
      >
        <div>
          <h1 className={"text-2xl font-semibold"}>Room {room.roomNo}</h1>
          <div
            className={"flex items-start gap-1 text-sm text-default-500 mt-1"}
          >
            <MapPin size={16} />
            <span>{room.address}</span>
          </div>
        </div>

        <div className={"flex gap-2"}>
          <Button
            onPress={handleEditRoom}
            variant={"bordered"}
            className={"border-[0.5px]"}
            startContent={<Pencil size={16} />}
          >
            Edit
          </Button>
          <Button
            color={"danger"}
            variant={"flat"}
            startContent={<Trash2 size={16} />}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className={"bg-gray-200/20 rounded-2xl p-4 md:p-7 space-y-6"}>
        <div className={"flex justify-between items-center"}>
          <RoomChip mode={"status"} room={room} />
          <h2 className={"text-2xl font-semibold"}>
            MMK {room.price.toFixed(2)}
          </h2>
        </div>

        <div className={"grid grid-cols-1 lg:grid-cols-2 gap-6"}>
          <RoomCard title={"Description"} icon={Home}>
            <p className="text-default-600 leading-relaxed">
              {room.description}
            </p>
          </RoomCard>

          <RoomCard title={"Room Information"} icon={Layers}>
            <InfoRow label={"Row Number"} value={room.roomNo} />
            <InfoRow label={"BedRooms"} value={room.bedrooms} />
            <InfoRow label={"BathRooms"} value={room.bathrooms} />
            <InfoRow label={"Floor"} value={room.floor} />
            <InfoRow label={"Dimension"} value={room.dimension} />
            <InfoRow label={"Max Occupancy"} value={room.maxNoPeople} />
            <InfoRow
              label={"Monthly Rate"}
              value={formatCurrency(room.price)}
            />
          </RoomCard>
        </div>

        <div className={"flex flex-col sm:flex-row gap-3 pt-4"}>
          <Button
            className={"bg-primary flex-1"}
            size={"lg"}
            startContent={<Download size={18} />}
          >
            Download Room Details
          </Button>
          <Button
            variant="bordered"
            size="lg"
            className="flex-1 border-[0.5px] border-gray-400"
            onPress={() => navigate(`/room/${room.id}/utilities`)}
          >
            View Utility History
          </Button>
        </div>
      </div>
    </div>
  );
}
