import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        clearNotification: () => null,
        setNotification(state, { payload }) {
            const time = payload.time * 1000 || 5000
            return { message: payload.message, color: payload.color || "green", time }
        }
    },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer