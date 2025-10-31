import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface InitialState {
    currentPage: number
}

const initialState: InitialState = {
    currentPage: 1
}

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        }
    },
    selectors: {
        selectCurrentPage: (state) => state.currentPage
    }
})

export const { setCurrentPage } = roomSlice.actions
export const { selectCurrentPage } = roomSlice.selectors
export default roomSlice.reducer;