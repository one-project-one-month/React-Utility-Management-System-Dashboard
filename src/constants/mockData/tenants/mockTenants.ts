import type { TenantType } from "@/types/tenants/tenantType.ts";

// type Occupant = {
//   name: string;
//   nrc: string;
//   relationshipToTenant: string;
// };
//
// type TenantTypes = {
//   id: string;
//   name: string;
//   nrc: string;
//   occupants: Occupant[];
//   email: string;
//   phoneNo: string;
//   emergencyNo: string;
//   roomId: string;
//   contractId: string;
// };

export const mockTenants: TenantType[] = [
  {
    id: "t1",
    name: ["Alice Johnson", "Sherlock Holmes"],
    nrc: ["12/ABC(N)123456"],
    email: "alice@example.com",
    phoneNo: "0912345678",
    emergencyNo: "0991112233",
    roomId: "r1",
    contractId: "c1",
  },
  {
    id: "t2",
    name: ["Bob Smith", "Linda Smith", "Shin Thant Kyaw"],
    nrc: ["5/XYZ(N)654321", "5/XYZ(N)654322"],
    email: "bob@example.com",
    phoneNo: "0923456789",
    emergencyNo: "0945678901",
    roomId: "r2",
    contractId: "c2",
  },
  {
    id: "t3",
    name: ["Clara Lee"],
    nrc: ["10/LMN(N)112233"],
    email: "clara@example.com",
    phoneNo: "0941234567",
    emergencyNo: "0954321987",
    roomId: "r3",
    contractId: "c3",
  },
  {
    id: "t4",
    name: ["David Green", "Emma Green"],
    nrc: ["7/QWE(N)445566", "7/QWE(N)445567"],
    email: "david@example.com",
    phoneNo: "0938765432",
    emergencyNo: "0923344556",
    roomId: "r4",
    contractId: "c4",
  },
  {
    id: "t5",
    name: ["Evelyn Brown"],
    nrc: ["8/OPQ(N)778899"],
    email: "evelyn@example.com",
    phoneNo: "0998877665",
    emergencyNo: "0971239876",
    roomId: "r5",
    contractId: "c5",
  },
  {
    id: "t6",
    name: ["Frank Wilson"],
    nrc: ["6/JKL(N)334455"],
    email: "frank@example.com",
    phoneNo: "0911223344",
    emergencyNo: "0919988776",
    roomId: "r6",
    contractId: "c6",
  },
  {
    id: "t7",
    name: ["Grace Kim", "Noah Kim", "Sophie Kim"],
    nrc: ["3/AAA(N)111111", "3/AAA(N)111112", "3/AAA(N)111113"],
    email: "grace@example.com",
    phoneNo: "0956677889",
    emergencyNo: "0912233445",
    roomId: "r7",
    contractId: "c7",
  },
  {
    id: "t8",
    name: ["Henry Adams"],
    nrc: ["2/BBB(N)222222"],
    email: "henry@example.com",
    phoneNo: "0945566778",
    emergencyNo: "0932211445",
    roomId: "r8",
    contractId: "c8",
  },
  {
    id: "t9",
    name: ["Ivy Chen", "Leo Chen"],
    nrc: ["4/CCC(N)333333", "4/CCC(N)333334"],
    email: "ivy@example.com",
    phoneNo: "0912341122",
    emergencyNo: "0998877554",
    roomId: "r9",
    contractId: "c9",
  },
  {
    id: "t10",
    name: ["Jack White"],
    nrc: ["11/DDD(N)444444"],
    email: "jack@example.com",
    phoneNo: "0932112233",
    emergencyNo: "0923344112",
    roomId: "r10",
    contractId: "c10",
  },
  {
    id: "t11",
    name: ["Karen Black"],
    nrc: ["9/EEE(N)555555"],
    email: "karen@example.com",
    phoneNo: "0922113344",
    emergencyNo: "0951122334",
    roomId: "r11",
    contractId: "c11",
  },
  {
    id: "t12",
    name: ["Liam Davis", "Mia Davis"],
    nrc: ["1/FFF(N)666666", "1/FFF(N)666667"],
    email: "liam@example.com",
    phoneNo: "0944433221",
    emergencyNo: "0917766554",
    roomId: "r12",
    contractId: "c12",
  },
];
