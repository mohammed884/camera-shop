import React , {useState , useRef , useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../style/addForm.css'
import Footer from './footer';

require('dotenv').config()
export default function AddProduct() {

    let [user , setUser] = useState([]);
    const history = useHistory();
    useEffect(() =>
    {
        fetch('http://localhost:8000/user', {
            method: 'GET',
            credentials: 'include'
          })
          .then((res) => res.json())
          .then((data) => setUser(data))
          .catch((err) => console.log(err));
  
        } , [user]);
    if (typeof user[0] !== 'undefined')
    {
        if (user[0].isAdmin === false)
        {
            history.push('/home')
        }
    }

    let [title , setTitle] = useState('');
    let [desk , setDesk] = useState('');
    let [shortDesk , setShortDesk] = useState('');
    let [cover , setCover] = useState('');

    let [qty , setQty] = useState(0);
    let [price , setPrice] = useState(0);

    const fileInput = useRef(null)

    function handleSubmit(e)
    {
        e.preventDefault();
        e.stopPropagation()
        if (title === '' || qty === 0 || price === 0 || desk === '' || !cover) return console.log('err');
        else 
        {            
            const data = 
            {
                title,
                cover:cover.name,
                qty,
                price,
                desk,
                shortDesk,
            }

            axios.post(`http://localhost:8000/admin/products/add/${'mkjsefiow48ru88348sdkajwd'}` , data)
            .then(res => console.log(res))
            .catch(e => console.log(e));

            var formData = new FormData();
            formData.append('cover' , cover)
            
            axios.post(`http://localhost:8000/admin/products/upload/${'mkjsefiow48ru88348sdkajwd'}` , formData)
            .then(res => console.log(res))
            .catch(e => console.log(e));
            history.push("/products")
            //SET UP DEFAULT VALUES
            setTitle('');
            setDesk('');
            setShortDesk('');
            setCover('');
            setQty(0);
            setPrice(0);
        }
    }

    //INPUT ON FOUCS
    function inputFoucs(e)
    {
        e.target.classList.add('box-shadow')
    }
    //INPUT ON Blur
    function inputBlur(e)
    {
        e.target.classList.remove('box-shadow')
    }

    return (
        <div className="form-container">
            
            <div className="tech-head">
                <h1>Add Product</h1>
            </div>
            
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="top-border"></div> 
   
                <div className="flex-form">
                   <div>
                        <div className="sizing">
                            <label htmlFor="">Title</label>
                            <input onFocus={inputFoucs} onBlur={inputBlur} type="text" name="title" onChange={(e) => setTitle(title = e.target.value) }/>
                        </div>

                        <div className="sizing">
                            <label htmlFor="">Qty</label>
                            <input onFocus={inputFoucs} onBlur={inputBlur} type="number" name="qty" onChange={(e) => setQty(qty + Number( e.target.value)) }/>
                        </div> 

                        <div className="sizing">
                            <label htmlFor="">Price</label>
                            <input onFocus={inputFoucs} onBlur={inputBlur} type="number" name="price" onChange={(e) => setPrice(price + Number(e.target.value))}/> 
                        </div>   

                        <div className="sizing">
                            <label htmlFor="">Description</label>
                            <textarea name="desk" onChange={(e) =>setDesk(desk = e.target.value) }></textarea>
                        </div>  


                        <div className="sizing">
                            <label htmlFor="">Short Description</label>
                            <textarea name="shortDesk" onChange={(e) => setShortDesk(shortDesk = e.target.value) }></textarea>
                        </div>  

                        <div className="sizing">
                            <input onFocus={inputFoucs} onBlur={inputBlur} type="file" name="cover" ref={fileInput} onChange={(e) => setCover(cover = e.target.files[0])}/>
                            <label htmlFor="" onClick={() => {fileInput.current.click()}} style={{cursor:'pointer'}}>Cover {cover.name !== 'undefiend' ? cover.name : ''}</label>
                        </div>  
                        <button type="submit">Add</button>   
                        
                   </div>
                   <div>
    <svg id="ab50f2c7-a193-4613-b9ea-86e2f0314211" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="860.24803" height="688" viewBox="0 0 860.24803 688"><path d="M386.98267,492H174.876a5.00581,5.00581,0,0,1-5-5V233a5.00581,5.00581,0,0,1,5-5H386.98267a5.00573,5.00573,0,0,1,5,5V487A5.00573,5.00573,0,0,1,386.98267,492ZM174.876,230a3.00336,3.00336,0,0,0-3,3V487a3.00336,3.00336,0,0,0,3,3H386.98267a3.00328,3.00328,0,0,0,3-3V233a3.00328,3.00328,0,0,0-3-3Z" transform="translate(-169.87598 -106)" fill="#cacaca"/><rect x="33.55334" y="176" width="155" height="96" fill="#ff0a0e"/><rect x="33.55334" y="308" width="39" height="24" fill="#e4e4e4"/><rect x="149.55334" y="308" width="39" height="24" fill="#e4e4e4"/><rect x="91.55334" y="308" width="39" height="24" fill="#e4e4e4"/><path d="M678.98267,370H466.876a5.00573,5.00573,0,0,1-5-5V111a5.00573,5.00573,0,0,1,5-5H678.98267a5.00573,5.00573,0,0,1,5,5V365A5.00573,5.00573,0,0,1,678.98267,370ZM466.876,108a3.00328,3.00328,0,0,0-3,3V365a3.00328,3.00328,0,0,0,3,3H678.98267a3.00328,3.00328,0,0,0,3-3V111a3.00328,3.00328,0,0,0-3-3Z" transform="translate(-169.87598 -106)" fill="#cacaca"/><path d="M681.51612,531H469.40968a5.00573,5.00573,0,0,1-5-5V451a5.00573,5.00573,0,0,1,5-5H681.51612a5.00573,5.00573,0,0,1,5,5v75A5.00573,5.00573,0,0,1,681.51612,531ZM469.40968,448a3.00328,3.00328,0,0,0-3,3v75a3.00328,3.00328,0,0,0,3,3H681.51612a3.00328,3.00328,0,0,0,3-3V451a3.00328,3.00328,0,0,0-3-3Z" transform="translate(-169.87598 -106)" fill="#cacaca"/><rect x="326.05334" y="170.5" width="154" height="24" rx="11.99999" fill="#e4e4e4"/><rect x="326.05334" y="208.5" width="154" height="24" rx="11.99999" fill="#e4e4e4"/><circle cx="403.05334" cy="87.5" r="56" fill="#ff0a0e"/><rect x="397.08691" y="370.5" width="81" height="24" rx="11.99999" fill="#e4e4e4"/><circle cx="355.08691" cy="382.5" r="22" fill="#ff0a0e"/><path d="M1029.124,794h-381a1,1,0,0,1,0-2h381a1,1,0,0,1,0,2Z" transform="translate(-169.87598 -106)" fill="#cacaca"/><path d="M916.25519,578.045a8.32992,8.32992,0,0,1,3.3269-12.332l-2.94428-29.45488,13.62031,7.14918.70781,26.87481a8.375,8.375,0,0,1-14.71074,7.76292Z" transform="translate(-169.87598 -106)" fill="#ffb6b6"/><path d="M796.96992,573.90315a8.32989,8.32989,0,0,1,3.3269-12.332l-2.94429-29.45488,13.62032,7.14918.7078,26.87481a8.375,8.375,0,0,1-14.71073,7.76292Z" transform="translate(-169.87598 -106)" fill="#ffb6b6"/><polygon points="717.949 675.734 707.794 675.734 702.962 636.562 717.951 636.562 717.949 675.734" fill="#ffb6b6"/><path d="M890.41517,791.57838l-32.7461-.00121V791.163a12.74639,12.74639,0,0,1,12.74569-12.7455h.00081l20.0002.00081Z" transform="translate(-169.87598 -106)" fill="#2f2e41"/><polygon points="642.568 675.734 632.412 675.734 627.581 636.562 642.569 636.562 642.568 675.734" fill="#ffb6b6"/><path d="M815.0335,791.57838l-32.7461-.00121V791.163a12.74639,12.74639,0,0,1,12.7457-12.7455h.0008l20.00021.00081Z" transform="translate(-169.87598 -106)" fill="#2f2e41"/><circle cx="867.65097" cy="350.90583" r="26.81916" transform="translate(-231.86478 353.17866) rotate(-28.66315)" fill="#ffb8b8"/><polygon points="638.578 453.984 633.608 461.857 623.668 666.875 644.377 666.047 685.796 492.917 702.363 667.703 720.587 668.532 735.374 465.271 638.578 453.984" fill="#2f2e41"/><path d="M916.9709,405.07886l-33.96317-18.22414-38.105-2.48511-33.57833,20.70925s29.43648,86.97885-2.87,137.50942L803.48422,566.611l102.71787,7.45533s-6.627-107.6881,2.48511-120.942S916.9709,405.07886,916.9709,405.07886Z" transform="translate(-169.87598 -106)" fill="#3f3d56"/><path d="M905.24979,409.5925l11.72111-4.51364s20.70925,18.22414,19.88088,62.12775-5.30287,92.77744-5.30287,92.77744l-15.40638,2.48511-8.2837-71.23982-11.59718-62.12775Z" transform="translate(-169.87598 -106)" fill="#3f3d56"/><path d="M823.489,409.5925l-11.72111-4.51364S791.05867,423.303,791.887,467.20661s5.30287,92.77744,5.30287,92.77744l15.40637,2.48511,8.2837-71.23982,11.59718-62.12775Z" transform="translate(-169.87598 -106)" fill="#3f3d56"/><path d="M887.03875,323.84926a23.13651,23.13651,0,0,0-17.91633-6.55764c-5.7723.46641-6.14806.60621-11.33346,3.18485a91.52876,91.52876,0,0,0-9.39925,5.141c-.02831-1.23173-5.14414-5.9448-5.97211-5.0323-.82756.9125,2.13484,6.84138,1.47311,7.88064s-6.64637-2.67719-7.2717-3.73879c4.62278,6.37542,10.72675,18.97894,9.26213,26.7165a7.71584,7.71584,0,0,1,13.47639,4.64183c.32641,5.29026-4.57626,11.09012-1.37037,15.311,1.8339,2.41483,5.32737,2.61556,8.35974,2.6014l22.43475-2.50109c4.82016-7.68153,7.825-13.77387,9.13674-22.747C899.23011,339.77657,893.47076,330.24213,887.03875,323.84926Z" transform="translate(-169.87598 -106)" fill="#2f2e41"/></svg>
</div>
                </div>
            </form>
            <Footer/>
        </div>
    )
}
