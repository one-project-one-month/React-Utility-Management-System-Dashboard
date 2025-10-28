import InfoCard from "@/components/Tenants/TenantDetailsPage/info-card.tsx";
import type { Tenant } from "@/types/tenants/tenantType.ts";

interface Props {
  tenant: Tenant;
}
export default function TenantInfo({ tenant }: Props) {
  const room = tenant.room;
  const contract = tenant.contract;

  const personalAndContactInfo = {
    "Full Name": tenant.name,
    Email: tenant.email,
    NRC: tenant.nrc,
    "Ph Number": tenant.phoneNo,
    "Emergency Number": tenant.emergencyNo,
    "No Of Occupants": (tenant.occupants?.length ?? 0) + 1,
  };

  const roomAndContractInfo = {
    "Room Number": room?.roomNo,
    "Contract Type": contract?.contractType.name,
    "Monthly Rent Fee": contract?.contractType.price,
    // "Contract Start": contract?.contractType.duration,
    // "Contract End": contract?.endDate,
    Duration: contract?.contractType.duration,
    "Total Rent Fee": contract?.contractType.price,
  };

  return (
    <div className="h-[calc(100vh-260px)] pb-4 pr-2 mt-4 rounded-2xl flex flex-col gap-5 overflow-y-auto custom-scrollbar">
      <div className="w-full grid grid-cols-2 gap-8 mt-6">
        <InfoCard
          header={"  Personal & Contact Information"}
          obj={personalAndContactInfo}
        />
        <InfoCard
          header={"  Room & Contract Information"}
          obj={roomAndContractInfo}
        />
        {tenant.occupants?.length &&
          tenant.occupants.map((occupant, index) => {
            const occupantInfo = {
              "Full Name": occupant.name,
              NRC: occupant.nrc,
              RelationshipToTenant: occupant.relationshipToTenant,
            };
            return (
              <InfoCard
                key={occupant.id}
                header={`Occupant ${index + 1}`}
                obj={occupantInfo}
              />
            );
          })}
      </div>{" "}
    </div>
  );
}
