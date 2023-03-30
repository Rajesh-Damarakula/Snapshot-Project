import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const searchData = useRef(null);
  const [searchText,setSearchText] = useState("mountains");
  const [imageData,setImageData] = useState([]);
  useEffect(()=>{
      const params ={
        method:"flickr.photos.search",
        api_key:"fb66a8bb673d05ef6948e67a6e54432a",
        text:searchText,
        sort:"",
        per_page:40,
        license:'4',
        extras:"owner_name,license",
        format:"json",
        nojsoncallback:1
      }
      const  parameters = new URLSearchParams(params);
      const url = `https://api.flickr.com/services/rest/?${parameters}`
      axios.get(url).then((res)=>{
        console.log(res.data);
        const arr=res.data.photos.photo.map((imgData)=>{
          return fetchFlickrImageUrl(imgData,'q')
        })
        setImageData(arr);
      }).catch(()=>{

      }).finally(()=>{

      })
  },[searchText]);
  const fetchFlickrImageUrl = (photo,size)=>{
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if(size){
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
    <>
      <section >
      <h2>snapshot</h2>
      <span>
      <input onChange={(e)=>{searchData.current=e.target.value}}/>
      <button onClick={()=>{setSearchText(searchData.current)}}>Search</button>
      </span>
      </section>
      <section className='image-variants'>
          <button onClick={()=>{setSearchText("mountains")}}>Mountain</button>
          <button onClick={()=>{setSearchText("beaches")}}>Beaches</button>
          <button onClick={()=>{setSearchText('birds')}}>Birds</button>
          <button onClick={()=>{setSearchText('food')}}>Food</button>
      </section>
    
      <section className='image-container'>
        
          {imageData.map((imageurl,key)=>{
            return (
              <article className='flickr-image'>
                  <img src={imageurl} key={key}/>
              </article>
            )
            
          })}
        
      </section>
    </>
  );
}

export default App;
