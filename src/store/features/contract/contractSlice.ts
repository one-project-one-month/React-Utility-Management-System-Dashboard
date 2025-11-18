import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
   tenantName: string | undefined;
   tenantId: string | undefined;
   roomNo: number | undefined;
   contractType: string | undefined;
   startDate: string | undefined;
   endDate: string | undefined;
   rentalFee: number | undefined;
}

const initialState: InitialState = {
   tenantName: undefined,
   tenantId: undefined,
   roomNo: undefined,
   contractType: undefined,
   startDate: undefined,
   endDate: undefined,
   rentalFee: undefined,
};

const contractSlice = createSlice({
   name: "contract",
   initialState,
   reducers: {
      setTenantName: (state, action: PayloadAction<string>) => {
         state.tenantName = action.payload;
      },
      setTenantId: (state, action: PayloadAction<string>) => {
         state.tenantId = action.payload;
      },
      setRoomNo: (state, action: PayloadAction<number>) => {
         state.roomNo = action.payload;
      },
      setContractType: (state, action: PayloadAction<string>) => {
         state.contractType = action.payload;
      },
      setStartDate: (state, action: PayloadAction<string>) => {
         state.startDate = action.payload;
      },
      setEndDate: (state, action: PayloadAction<string>) => {
         state.endDate = action.payload;
      },
      setRentalFee: (state, action: PayloadAction<number>) => {
         state.rentalFee = action.payload;
      },
   },
   selectors: {
    selectTenantName: (contract) => contract.tenantName,
    selectTenantId: (contract) => contract.tenantId,
    selectRoomNo: (contract) => contract.roomNo,
    selectContractType: (contract) => contract.contractType,
    selectStartDate: (contract) => contract.startDate,
    selectEndDate: (contract) => contract.endDate,
    selectRentalFee: (contract) => contract.rentalFee
   }
});

export const { setTenantName, setTenantId, setRoomNo, setContractType, setStartDate, setEndDate, setRentalFee}  = contractSlice.actions
export const { selectTenantName, selectTenantId, selectRoomNo, selectContractType, selectStartDate, selectEndDate, selectRentalFee} = contractSlice.selectors
export default contractSlice.reducer;
