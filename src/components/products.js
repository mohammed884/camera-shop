import React, {useState , useEffect} from 'react'
import axios from 'axios';
import '../style/products.css'
import Footer from './footer';
import Loading from './loading';
export default function Products() {

    let [products , setProducts] = useState([]);
    let [loading , setLoading] = useState(true);
    let [user , setUser] = useState([]);
    let [isAdmin , setIsAdmin] = useState(false)
    useEffect(() =>
    {
        axios.get('http://localhost:8000/products/mkjsefiow48ru88348sdkajwd').then(res => setProducts(res.data));

        fetch('http://localhost:8000/user' , {
            method:'GET',
            credentials:'include'
        })
        .then(res => res.json())
        .then(res => {
            if (res.isLogin) setUser(user = [res.user]);
            if (user[0].isAdmin) setIsAdmin(true)
        })
        .catch(err => console.log(err));        
        setLoading(false);
    } , [loading]);

    if (loading)
    {
        return (
           <Loading/> 
        )
    }

    return (
        <div className="products-container">
            <div className="max-tech"><h1>Products</h1></div>
            
            <div className="max-product">
                <div className="top-border"></div>
                <div className="grid-products">
                    {products.map(product => 
                        <div key={product._id} className="card">
                            <img src={`/images/${product.cover}`} alt="..." loading="lazy" height="100px" width="100px"/>   
                            <div className="card-info">
                                <div style={{fontSize:'larger'}}>{product.title}</div>     
                                <div>{product.price}$</div>
                                
                            </div>  
                            <label>
                                <textarea readOnly>{product.shortDesk}</textarea>
                            </label>  

                            <div className="card-link" id="card-link">
                                <a href={`/products/${product._id}`} rel="noopener" aria-label="more details">More Details</a>
                                {isAdmin ? <a href={`/admin/edit/${product._id}`}>Edit</a> : ''}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    )
}
