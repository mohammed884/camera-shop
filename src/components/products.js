import React, {useState , useEffect} from 'react'
import axios from 'axios';
import '../style/products.css'
import Footer from './footer';
export default function Products() {

    const [products , setProducts] = useState([]);

    useEffect(() =>
    {
        axios.get('http://localhost:8000/products/mkjsefiow48ru88348sdkajwd').then(res => setProducts(res.data));
    }, [products])

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
                                <h3>{product.title}</h3>     
                                <div>{product.price}$</div>
                                
                            </div>    
                            <textarea readOnly>{product.shortDesk}</textarea><br />

                            <div className="card-link">
                                <a href={`/products/${product._id}`}>More Details</a>
                                <div></div>
                            </div>
                            
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    )
}
