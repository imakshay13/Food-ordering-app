import { Fragment, useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const [showForm,setShowForm]=useState(false);
    const[isSubmitting ,setIsSubmitting] = useState(false);
    const[didSubmit ,setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItem = cartCtx.item.length>0;
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item,amount:1});
    };

    const submitOrderHandler = async(userData) => {
        setIsSubmitting(true);

        await fetch("https://zomato-fc46d-default-rtdb.firebaseio.com/orders.json",{
            method: 'POST',
            body: JSON.stringify({
                user :userData, 
                orderedItems : cartCtx.item
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };


    const cartItems = <ul className={classes['cart-items']}>
    {cartCtx.item.map(item => <CartItem key={item.id} 
        name = {item.name}
        amount = {item.amount} 
        price={item.price} 
        onRemove = {cartItemRemoveHandler.bind(null,item.id)} 
        onAdd = {cartItemAddHandler.bind(null,item)}
    />)}</ul>;

    const onShowFormHandler = ()=> {
        setShowForm(true);
    };
    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItem && <button className={classes.button} onClick={onShowFormHandler}>Order</button>}
        </div>
    );
    
    const cartModalContent = (<Fragment>
    {cartItems}
    <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
    </div>
    {showForm && <Checkout onClick={props.onClose} onConfirm = {submitOrderHandler}/>}
    {!showForm && modalActions}
    </Fragment>);

    const isSubmittingModelContent = <p>Sending order data..</p>
    const didSubmitModelContent = <Fragment>
        <p>Your order is placed</p>
        <div className={classes.actions}>
            <button className={classes['button']} onClick={props.onClose}>Close</button>
        </div>
    </Fragment>

    return <Modal onClose = {props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModelContent}
        {!isSubmitting && didSubmit && didSubmitModelContent}
    </Modal>
}

export default Cart;