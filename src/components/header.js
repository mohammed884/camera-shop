import React, {useState , useEffect} from 'react';

import '../style/header.css';

function Header() {

    return (
        <div className="header">
            <div className="max">
                <div className="space"> 
                    <a href="/">Home</a>
                    <a href="/products">Products</a>
                    <a href="/cart">Cart</a>
                    <a href="/about">About</a>
                    <a href="/account">Account</a>
                </div>                
            </div>                
        </div>
    )
}
export default Header