import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserState} from '@utils/interfaces';

const initialState: UserState = {
  name: '',
  email: '',
  previousEmail: '',
  password: '',
  isLoggedIn: false,
} satisfies UserState as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setUser(
      state,
      action: PayloadAction<{name: string; email: string; password: string}>,
    ) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.previousEmail = action.payload.email;
      state.password = action.payload.password;
      state.isLoggedIn = true;
    },
    login(state, action: PayloadAction<{email: string; password: string}>) {
      if (
        state.email === action.payload.email &&
        state.password === action.payload.password
      ) {
        state.isLoggedIn = true;
      }
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    clearUser(state) {
      state.name = '';
      state.email = '';
      state.password = '';
      state.previousEmail = '';
      state.isLoggedIn = false;
    },
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setUser,
  logout,
  clearUser,
  login,
} = userSlice.actions;

export default userSlice.reducer;
