
export type UtilityUnit = {
    id:number,
    billId:string,
    electricityUnits: number,
    waterUnits: number,
    roomNo: number,
    roomStatus:'Available' | 'Rented' | 'Purchased' | 'InMaintenance',
    floor:number,
    tenantName:string,
    createdAt: Date,
    updatedAt: Date
}

