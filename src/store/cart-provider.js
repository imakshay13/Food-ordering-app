import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState  = {
    item : [],
    totalAmount : 0
};
const cartReducer = (state,action) => {
    if(action.type==='ADD')
    {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.item.findIndex(item => item.id===action.item.id);
        const existingCartItem = state.item[existingCartItemIndex];
        let updatedItems;
        if(existingCartItem)
        {
            const updatedItem = {
                ...existingCartItem,
                amount:existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.item];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else{
        
            updatedItems = state.item.concat(action.item);
        }
        return {
            item : updatedItems,
            totalAmount : updatedTotalAmount
        };
    }
    if(action.type ==='REMOVE')
    {   
        const existingCartItemIndex = state.item.findIndex(item => item.id===action.id);
        const existingItem = state.item[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount ===1)
        {
            updatedItems = state.item.filter(item => item.id != action.id);
        }
        else {
            const updatedItem = {...existingItem , amount : existingItem.amount-1};
            updatedItems = [...state.item];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            item: updatedItems,
            totalAmount : updatedTotalAmount
        }

    }
    if(action.type === 'CLEAR')
    {
        return defaultCartState;
    }
    return  defaultCartState;
};

const CartProvider = props => {
    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);
    const addItemCartHandler = (item) => {
        dispatchCartAction({
            type:'ADD',
            item : item});
    };
    const removeItemCartHandler = (id) => {
        dispatchCartAction({
            type:'REMOVE',
            id : id
        });};

    const clearCartHandler = () => {
        dispatchCartAction({type : 'CLEAR'});
    };
    const cartContext = 
    {
        item : cartState.item,
        totalAmount : cartState.totalAmount,
        addItem : addItemCartHandler,
        removeItem: removeItemCartHandler,
        clearCart : clearCartHandler,
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;