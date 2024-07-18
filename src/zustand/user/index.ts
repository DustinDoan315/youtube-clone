import User from '@redux/interface';
import {create} from 'zustand';

interface UserStoreState {
  user: User;
  setUser: (payload: User) => void;
  removeUser: () => void;
}
const initialState: User = {
  email: '',
  id: '',
  name: '',
  phone: '',
};

const useUserStore = create<UserStoreState>(set => ({
  user: initialState,
  setUser: (payload: User) => set(state => ({...state, user: payload})),
  removeUser: () => set({user: initialState}),
}));

export default useUserStore;
