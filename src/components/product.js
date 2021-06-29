import axios from 'axios';
import React, {useState , useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Loading from './loading';
import '../style/product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
export default function Product({match}) {
    let [product , setProudct] = useState([]);
    let [loading , setLoading] = useState(true);
    let [qty , setQty] = useState(1);
    let [isLogin , seIsLogin] = useState(false);
    let [msg , setMsg] = useState('');
    const history = useHistory()
    useEffect(() =>
    {
        axios.get(`http://localhost:8000/product/${match.params.id}`)
        .then(res => setProudct([res.data]))
        .catch(err => console.log(err))

        fetch('http://localhost:8000/user' , {
            method:'GET',
            credentials:'include',
        })
        .then(res => res.json())
        .then(res => {
            if (res.isLogin) seIsLogin(true)
        })
        .catch(err => console.log(err))
        setLoading(false)

    } , []);

    if (loading) return (<Loading/>)
    const handleAddToCart = () =>
    {
        if (!isLogin) return alert('Please Login');
        fetch(`http://localhost:8000/add/to/cart/${match.params.id}` , {
            method:'POST',
            credentials:'include', 
            headers: { 
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({qty})        
        })
        .then(res => res.json())
        .then(res => console.log('Good'))
        .catch(err => console.log(err))
        alert(`${product.map(product => product.title)} Added To Cart`)
    }
    const iconStlye={
            fontSize:'2rem' , 
            cursor:'pointer' , 
            width:'40px' , 
            height:'40px' , 
            color:'#1d2b3a' , 
            display:'flex' , 
            justifyContent:'center' , 
            alignItems:'center'
    }
    return (
        <div className="product-container">
            <div className="tech-head"><h1>{product.map(product => product.title)}</h1></div>
            <div className="product-max">
                    <div className="top-border"></div>
                    {product.map(product =>
                        <div key={product._id} className="product-flex">
                            <div className="product-info">
                                <div className="price-title">
                                    <div>Price {product.price}$</div>
                                </div>
                                <label style={{marginTop:'25px'}}>
                                    <p>Description</p>
                                   <textarea readOnly style={{marginTop:'25px'}}>{product.desk}</textarea> 
                                </label>
                                                          
                                <div className="add-section">
                                    
                                    <FontAwesomeIcon icon={faAngleLeft} style={iconStlye} onClick={() => history.goBack()}/>
                                    <div className="style-select">
                                    <select name="" id="" onChange={(e) => e.target.value <= 10 ? setQty(qty = Number(e.target.value)) : alert('wrong value')}>
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
                                    </div>

                                    <button onClick={handleAddToCart} className="add-button">Add To Cart</button>
                                </div>
                            </div>

                            <div className="image-section">
                                <div>
                                   <img src={`/images/${product.cover}`} alt="..." loading="lazy"/> 
                                </div>
                                
                                <p>{product.title}</p>
                            </div>
                        </div>
                        
                    )}              
            </div>
        </div>
    )
}