import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { create } from "zustand";
import { AppStateType } from "../types";
import { Storage } from "../utils.js/utils";
import produce from 'immer';
import { getAllCustomer } from "../services/appService";
import { transformObjectToArray } from "../utils.js/helpers";
import { ToastAndroid } from "react-native";


export const useAppStore = create<AppStateType>((set) => ({
    // App Related states
    isLoggedIn: false,
    loading: false,
    user: null,
    isRestoring: true,  
    restaurants: [], 
    cart: [],
    setLoggedIn: (value: boolean) => {
        set((state) => ({ ...state, isLoggedIn: value }))
    },
    addToCart: (product: any) => {
        ToastAndroid.show('Added to cart', ToastAndroid.SHORT)
        set((state) => ({ ...state, cart: [...state.cart, product] }))
    },
    login: (userInfo: User) => {
        try {
            set((state) => ({ ...state, loading: true }));
            Storage.save('user', userInfo);
            set(produce((state: AppStateType) => {
                state.loading = false;
                state.user = userInfo;
                state.isLoggedIn = true;
            }));
        } catch (error) {
            set(produce((state: AppStateType) => {
                state.loading = false;
            }));
        }
    },
    restoreUser: async () => {
        try {
            set((state) => ({ ...state, isRestoring: true }));
            const userInfo = await Storage.get('user');
            if (userInfo) {
                set(produce((state: AppStateType) => {
                    state.isRestoring = false;
                    state.user = userInfo;
                    state.isLoggedIn = true;
                }));
            } else {
                set(produce(
                    (state: AppStateType) => {
                        state.isRestoring = false;
                        state.user = null;
                        state.isLoggedIn = false;
                    }
                ))
            }
        } catch (error) {
            set(produce(
                (state: AppStateType) => {
                    state.loading = false;
                }
            ))
        }
    },
    signOut: async () => {
        try {
            await GoogleSignin.signOut();
            Storage.remove('user');
            set(produce(
                (state: AppStateType) => {
                    state.user = null;
                    state.isLoggedIn = false;
                }
            ))
        } catch (error) {
            set(produce(
                (state: AppStateType) => {
                    state.loading = false;
                }
            ))
        }
    },
    getTodaysCustomers: () => {

    },
    getCustomer: (search: string) => {
 
            set(produce((state: AppStateType) => {
                state.restaurants = [{
                    id: '1',
                    name: "Berries", 
                    description: "Berries",
                    distance: "1 km",
                    rating: 4.5,
                    image: 'https://media.istockphoto.com/id/1390005458/photo/interior-of-a-modern-cozy-italian-restaurant.jpg?s=2048x2048&w=is&k=20&c=uKM0WHp6mb-rrhwYsKFp6MwNS_L7t-0-B8q8kYsmOkA=',
                    products: [
                        {
                            id: '1',
                            name: "Oranges",
                            price: 20,
                            description: "Oranges",
                            image: 'https://cdn.pixabay.com/photo/2017/01/20/15/06/oranges-1995056_1280.jpg'
                        },
                        {
                            id: '1',
                            name: "Vegetables",
                            price: 20,
                            description: "Vegetables",
                            image: 'https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_1280.jpg',
                        },
                        {
                            id: '1',
                            name: "Apple",
                            price: 20,
                            description: "Apple",
                            image: 'https://media.istockphoto.com/id/164084111/photo/apples.jpg?s=2048x2048&w=is&k=20&c=W8Mg_0JyDFTAKxITRxzBZc8S5ulEchg7ayMQP7v-mYY='
                        }
                    ],
                },
                ];
            }));
      
    },
    // Billing Related operations

}))