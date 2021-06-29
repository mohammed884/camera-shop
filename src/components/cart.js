import React, {useState , useEffect} from 'react'
import '../style/cart.css'
export default function Cart() {
    let [cart , setCart] = useState();
    let [isLogin , setIsLogin] = useState(false);
    let [qty , setQty] = useState(1);
    let [update , setUpdate] = useState(false);
    useEffect(() =>
    {
        fetch('http://localhost:8000/user' , {
            method:'GET',
            credentials:'include',
        })
        .then(res => res.json())
        .then(res => {
            if (res.isLogin) setIsLogin(true)
            if (res.user) setCart(res.user.cart);
        })
    } , [update]);

    var totalPrice = 0;
    if (cart !== undefined)
    {
        let allQty = cart.map(item => item.pQty);
        let allPrices = cart.map(item => item.pPrice);
        for (let i = 0; i < allQty.length; i++)
        {
            totalPrice += allQty[i] * allPrices[i]
        }
        console.log(totalPrice)
    }
    if (!isLogin) return 'Please Login';

    const updateQty = (e) =>
    {
        
        fetch(`http://localhost:8000/update/qty/${e.target.value}` , {
            method:'POST',
            credentials:'include',
            headers: { 
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({qty}),
        })
        .then(res => res.json())
        .then(res => {
            if (res.done) return setUpdate(!update) 
            
            if (!res.done) return alert(res.msg)
        })
        .catch(err => console.log(err));
    }
    const deleteProduct = (e) =>
    {
        fetch(`http://localhost:8000/cart/delete/product/${e.target.value}` , {
            method:'DELETE',
            credentials:'include',
            headers: { 
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({qty})
        })
        .then(res => res.json())
        .then(res => {
            if (res.done) 
            {
                setUpdate(!update)
                const parent = e.target.parentElement.parentElement;
                parent.classList.add('remove');
                setTimeout(() =>
                {
                    parent.style.display = 'none';
                } , 200);
            }
            if (!res.done)
            {
                alert(res.msg)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="cart-container">
            <div className="max-cart">
                <div className="max-width-cart">
                    <div className="shoping-head">
                        <div>Items in the cart {cart !== undefined ? cart.length : '0'}</div>
                        <div><a href="/products">Continue Shoping</a></div>
                    </div>
                    {cart !== undefined ? cart.map(product => 
                                <div className="grid-cart" key={product.pId}>
                                    <div className="flex-product" >
                                        <div>
                                           <img src={`/images/${product.pCover}`} alt="..." /> 
                                        </div>
                                        <div>
                                            {product.pTitle}
                                        </div>
                                        
                                        <div>
                                            {product.pPrice}$
                                        </div>

                                        <div className="update-qty">
                                            <div>
                                               {product.pQty}  
                                            </div>
                                              
                                            <select onChange={(e) => setQty(Number(e.target.value))}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>
                                            <div><button value={product.pId} onClick={updateQty}>Update Qty</button></div>
                                        </div>

                                        <div>
                                            <button value={product.pId} onClick={deleteProduct} style={{color:'#FF0A0E'}}>Remove</button>
                                        </div>
                                    </div>
                                </div>    
                     ) : 'Please Login'}
                </div>
                <div className="shoping-head" style={{width:'70%'}}>
                    <div>
                        Total Price {totalPrice}$
                    </div>
                </div>
            </div>
        </div>
    )
}
