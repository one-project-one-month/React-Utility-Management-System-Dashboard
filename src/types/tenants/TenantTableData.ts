export interface TenantTableActions {
  onEdit: () => void;
  onDetails: () => void;
}
export interface TenantTableData {
  // id: string;
  no: number;
  name: string;
  nrc: string;
  email: string;
  phoneNo: string;
  contractType: string;
  roomNo: number;
  occupantsCount: number;
  actions: TenantTableActions;
}
