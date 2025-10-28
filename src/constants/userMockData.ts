import type {UserDetails, UserList} from "@/types/user.ts";

export const userMockData: UserList[] = [
    {
        id: '1',
        userName: 'Kuzu',
        email: 'kuzu@69.dev.com',
        password: 'kuzu1234',
        phNumber: '09290848294',
        role: 'staff',
        tenantId: null,
        emergencyNo: '09290698269',
        isActive: true
    },
    {
        id: '2',
        userName: 'Sachi',
        email: 'sachi@69.bot.com',
        password: 'sachi5678',
        phNumber: '09760844214',
        role: 'staff',
        tenantId: null,
        emergencyNo: '09760694269',
        isActive: true
    },
    {
        id: '3',
        userName: 'Noriko',
        email: 'noriko@69.bot.com',
        password: 'noriko2024',
        phNumber: '09780849293',
        role: 'tenant',
        tenantId: 'T001',
        emergencyNo: '09786949269',
        isActive: true
    },
    {
        id: '4',
        userName: 'Madao',
        email: 'madao@69.dev.com',
        password: 'madao@admin',
        phNumber: '09256088234',
        role: 'admin',
        tenantId: null,
        emergencyNo: '09256988269',
        isActive: true
    },
    {
        id: '5',
        userName: 'Gori',
        email: 'gori@69.art.com',
        password: 'goriPass99',
        phNumber: '09690378224',
        role: 'tenant',
        tenantId: 'T002',
        emergencyNo: '09690698269',
        isActive: false
    },
    {
        id: '6',
        userName: 'User1',
        email: 'user1@69.art.com',
        password: 'user1pass',
        phNumber: '09690378224',
        role: 'staff',
        tenantId: null,
        emergencyNo: '09690698269',
        isActive: false
    },
    {
        id: '7',
        userName: 'User2',
        email: 'user2@69.bot.com',
        password: 'user2pass',
        phNumber: '09690378224',
        role: 'tenant',
        tenantId: 'T003',
        emergencyNo: '09690698269',
        isActive: true
    },
    {
        id: '8',
        userName: 'User3',
        email: 'user3@69.dev.com',
        password: 'user3pass',
        phNumber: '09690378224',
        role: 'admin',
        tenantId: null,
        emergencyNo: '09690698269',
        isActive: true
    },
    {
        id: '9',
        userName: 'User4',
        email: 'user4@69.art.com',
        password: 'user4pass',
        phNumber: '09690378224',
        role: 'tenant',
        tenantId: 'T004',
        emergencyNo: '09690698269',
        isActive: true
    },
    {
        id: '10',
        userName: 'User5',
        email: 'user5@69.art.com',
        password: 'user5pass',
        phNumber: '09690378224',
        role: 'tenant',
        tenantId: 'T005',
        emergencyNo: '09690698269',
        isActive: false
    },
    {
        id: '11',
        userName: 'User6',
        email: 'user6@69.dev.com',
        password: 'user6pass',
        phNumber: '09690378224',
        role: 'staff',
        tenantId: null,
        emergencyNo: '09690698269',
        isActive: false
    },
];

const userAdditionalDetails: Record<string, { room: number; nrc: string }> = {
    '1': { room: 0, nrc: '12/OUKATA(N)123456' },
    '2': { room: 0, nrc: '9/MAYAKA(N)789012' },
    '3': { room: 101, nrc: '5/THATANA(N)345678' },
    '4': { room: 0, nrc: '1/KAMATA(N)111111' },
    '5': { room: 102, nrc: '7/YAMANA(N)222222' },
    '6': { room: 0, nrc: '3/BAHANA(N)333333' },
    '7': { room: 201, nrc: '8/KHEMAKA(N)444444' },
    '8': { room: 0, nrc: '2/BANTAKA(N)555555' },
    '9': { room: 202, nrc: '4/HANTAKA(N)666666' },
    '10': { room: 301, nrc: '6/PATAKA(N)777777' },
    '11': { room: 0, nrc: '10/KHAMATA(N)888888' }
}

export const userDetailMockData: UserDetails[] = userMockData.map(user => ({
    ...user,
    ...userAdditionalDetails[user.id]
}));

export const roleColors = {
    tenant: 'bg-blue-600/70 text-white',
    staff: 'bg-amber-600/70 text-white',
    admin: 'bg-indigo-600/70 text-white',
};

export const roleLabels = {
    tenant: 'Tenant',
    staff: 'Staff',
    admin: 'Admin',
}

export const ROLE_OPTIONS = [
    { key: "tenant", label: "Tenant" },
    { key: "staff", label: "Staff" },
    { key: "admin", label: "Admin" },
];

export const TENANT_OPTIONS = [
    { key: "T001", label: "T001" },
    { key: "T002", label: "T002" },
    { key: "T003", label: "T003" },
    { key: "T004", label: "T004" },
];