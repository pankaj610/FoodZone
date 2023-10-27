import { User } from '@react-native-google-signin/google-signin';
import {  Product, Restaurant } from "./billing";

export interface AppStateType {
  isLoggedIn: boolean;
  loading: boolean;
  isRestoring: boolean;
  user: User | null;
  restaurants: Restaurant[];
  cart: Product[];
  setLoggedIn: (value: boolean) => void;
  login: (user: User) => void;
  restoreUser: () => void;
  signOut: () => void;
  getCustomer: (search: string) => void;
  getTodaysCustomers: () => void;
  addToCart: (product: Product) => void;
}
