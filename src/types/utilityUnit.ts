export type Bill = {
    bill_id: string,
    room_number: string,
    tenant_name: string,
    created_date: Date,
    electricity_fee: number,
    water_fee: number
}
export type UtilityUnit = {
    id:number,
    bill_id:string,
    electricity_unit: number,
    water_unit: number,
    created_at: Date,
    updated_at: Date
}

