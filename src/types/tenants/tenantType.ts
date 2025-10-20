export type RelationshipToTenant =
  | "Spouse"
  | "Child"
  | "Parent"
  | "Relative"
  | "Friend"
  | "Other";
export interface Occupant {
  id: string;
  name: string;
  nrc: string;
  relationshipToTenant: RelationshipToTenant;
}

export interface TenantType {
  id: string;
  name: string;
  nrc: string;
  occupants: Occupant[];
  email: string;
  phoneNo: string;
  emergencyNo: string;
  roomId: string;
  contractId: string;
}
