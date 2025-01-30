import { defineStore } from 'pinia';
import {auth, realDb} from "../../firebase/config.js";
import { ref, computed } from 'vue';
import {
    ref as firebaseRef,
    onValue,
    set,
    push,
    child,
    remove,
    update,
} from 'firebase/database';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

const state = {
    posts: [],
    products: [],
    cart: [],
    cartGridModel: []
}

async function fetch() {

}



export const useProductStore = defineStore('productStore', () => {

    // state
    const posts = ref([]);
    const products = ref([]);
    const cart = ref([]);
    const cartGridModel = ref([]);

    // Getters
    const getProductWithID = computed(() => (id) =>
        products.value.find((item) => item.id === id)
    )

    const getCartCount = computed(() => (cart.value ? cart.value.length : 0));

    // Actions
    function fetchProducts() {
        return new Promise((resolve) => {
            const dbRef = firebaseRef(realDb, 'urunler');
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                products.value = data;
                resolve(data);
            })
        })
    }

    async function fetchCart() {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const cartref = firebaseRef(realDb, `users/${user.uid}/inCart`);
                    onValue(cartref, (snapshot) => {
                        const data = snapshot.val();
                        const cartArray = data ? Object.entries(data).map(([key, value]) => ({
                            id: key, ...value,
                        })) : [];
                        cart.value = cartArray;
                        resolve(cartArray);
                    })
                }
            })
        })
    }

    function fetchCartGridModel() {
        return fetchProducts().then((fetchedProducts) => {
            fetchCart().then((fetchedCart) => {
                cartGridModel.value = fetchedCart.map((cartItem) => ({
                    cart: cartItem,
                    product: fetchedProducts.find((item) => item.id === cartItem.pid),
                }));
                return cartGridModel.value;
            })
        })
    }

    function addToCart(payload) {
        onAuthStateChanged(auth, (user) => {
            if (user && payload.count > 0) {
                const cartref = firebaseRef(realDb, `users/${user.uid}/inCart`);
                push(cartref, payload);
                fetchCart();
            }
        });
    }

    function changeCountCart(idCount) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const cartref = firebaseRef(realDb, `users/${user.uid}/incart`);
                update(child(cartref, idCount.id), {count: idCount.count});
                fetchCart();
            }
        })
    }

    function removeFromCart(id) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const cartref = firebaseRef(realDb, `users/${user.uid}/inCart`);
                remove(child(cartref, id));
                fetchCart();
            }
        })
    }

    function register(payload) {
        createUserWithEmailAndPassword(auth, payload.email, payload.password)
            .then((userCredential) => {
                const newUser = userCredential.user;
                const userref = firebaseRef(realDb, `users/${newUser.uid}`);
                const userData = {
                    id: newUser.uid,
                    name: payload.name,
                    surname: payload.surname,
                    inCart: null,
                };
                set(userref, userData);
                alert(`Account for ${payload.email} created successfully`);
            })
            .catch((error) => {
                alert(error.message);
            })
    }

    function logout() {
        signOut(auth).then(() => {
            alert('Logged out successfully!');
        });
    }

    function login(payload) {
        signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then(() => {
                alert(`Welcome back, ${payload.email}!`);
            })
            .catch((error) => {
                alert(error.message);
            })
    }


    return {
        posts,
        products,
        cart,
        cartGridModel,
        getProductWithID,
        getCartCount,
        fetchProducts,
        fetchCart,
        fetchCartGridModel,
        addToCart,
        changeCountCart,
        removeFromCart,
        register,
        logout,
        login,
    }

})

