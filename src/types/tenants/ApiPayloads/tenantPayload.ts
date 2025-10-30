export interface OccupantPayload {
  id?: string;
  tenantId: string;
  name: string;
  nrc?: string;
  relationshipToTenant: string;
}

export interface TenantPayload {
  name: string;
  nrc: string;
  occupants?: OccupantPayload[];
  email: string;
  phoneNo: string;
  emergencyNo: string;
  roomId?: string;
}
