import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from './CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const [btnIsHighlighted , setBtnIsHighlighted]=useState(false);
    const cartCtx = useContext(CartContext);
    const {item} =cartCtx;
    useEffect(()=>{
        if(item.length === 0)
        {
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(()=> {
            setBtnIsHighlighted(false);
        },300);
        return () => {
            clearTimeout(timer)
        };
    },[item]);
    const btnClasses = `${classes.button} ${btnIsHighlighted? classes.bump : ''}`
    const numberOfCartItems = cartCtx.item.reduce((curNumber,item)=>{
        return curNumber + item.amount
    },0);
    
    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon /></span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton;