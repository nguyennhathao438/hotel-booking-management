import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogin: false,
    avatar: null,
    firstName: '',
    lastName: '',
    userId: '',
    role: [],
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const { avatar, firstName, lastName, userId, roles } = action.payload;
            state.isLogin = true;
            state.avatar = avatar;
            state.lastName = lastName;
            state.firstName = firstName;
            state.userId = userId;
            state.role = roles;
        },
        logout: (state) => {
            state.isLogin = false;
            state.avatar = null;
            state.firstName = '';
            state.lastName = '';
            state.userId = '';
            state.role = [];
        },
    }
})

export const{login, logout} =userSlice.actions;
export default userSlice.reducer