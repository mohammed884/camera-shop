import axios from 'axios';
import React, {useState , useEffect} from 'react'

export default function Product({match}) {
    const [product , setProudct] = useState([]);

        useEffect(() =>
        {
            axios.get(`http://localhost:8000/product/${match.params.id}`)
            .then(res => setProudct([res.data]))
            .catch(err => console.log(err))
        } , []);
    console.log(product)
    return (
        <div>
            {product.map(product =>
                <div>{product.title}</div>
                
            )}
        </div>
    )
}
