import InfoCard from "@/components/Tenants/TenantDetailsPage/info-card.tsx";
import type { TenantType } from "@/types/tenants/tenantType.ts";
import { mockRooms } from "@/constants/mockData/tenants/mockRooms.ts";
import { mockContracts } from "@/constants/mockData/tenants/mockContracts.ts";

interface Props {
  tenant: TenantType;
}
export default function TenantInfo({ tenant }: Props) {
  const room = mockRooms.find((room) => room.id === tenant.roomId);
  const contract = mockContracts.find(
    (contract) => contract.id === tenant.contractId,
  );

  const personalAndContactInfo = {
    "Full Name": tenant.name[0],
    Email: tenant.email,
    NRC: tenant.nrc[0],
    "Ph Number": tenant.phoneNo,
    "Emergency Number": tenant.emergencyNo,
    "No Of Occupants": tenant.name.length,
  };

  const roomAndContractInfo = {
    "Room Number": room?.roomNo,
    "Contract Type": contract?.contractName,
    "Monthly Rent Fee": contract?.monthlyRentFee,
    "Contract Start": contract?.startDate,
    "Contract End": contract?.endDate,
    "Total Rent Fee": "1,200,000MMK",
  };

  const occupants = tenant.name.map((name, index) => ({
    "Full Name": name,
    NRC: tenant.nrc[index],
    "Relationship to Tenant": index === 0 ? "Owner" : "Child",
  }));

  return (
    <div className="w-full grid grid-cols-2 gap-8 mt-6">
      <InfoCard
        header={"  Personal & Contact Information"}
        obj={personalAndContactInfo}
      />
      <InfoCard
        header={"  Room & Contract Information"}
        obj={roomAndContractInfo}
      />
      {occupants.map((occupant, index) => (
        <InfoCard header={`Occupant ${index + 1}`} obj={occupant} />
      ))}
    </div>
  );
}
