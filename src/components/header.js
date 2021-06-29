import React, {useEffect , useState} from 'react';

import '../style/header.css';

function Header() {
    const [cartLength , setCartLength] = useState(0);
    let [update , setUpdate] = useState(false);
    useEffect(() =>
    {   
        fetch(`http://localhost:8000/user` , {
            method:'GET',
            credentials:'include'
        })
        .then(res => res.json())
        .then(res => {
            if (res.isLogin) 
            {
                setUpdate(!update)
                setCartLength(res.user.cart.length)
            }
        })
        .catch(err => console.log(err))
    } , [update]);
    return (
        <div className="header">
            <div className="max">
                <div className="space"> 
                    <a href="/">Home</a>
                    <a href="/products">Products</a>
                    <a href="/cart">Cart({cartLength})</a>
                    <a href="/account">Account</a>
                    <a href="/about">About</a>
                </div>                
            </div>                
        </div>
    )
}
export default Header