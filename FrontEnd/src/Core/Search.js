import React, { useState ,useEffect } from 'react'
import {getCategories , list} from './apiGetProducts'
import Card from './Card'

const Search = () => {
    
    const [data , setData] = useState({
        categories : [],
        catogory : '',
        search : '',
        result : [],
        searched :false
    })


const {categories , catogory ,search , result , searched} = data

const loadCategories = ( ) => {
    getCategories().then(data => {
        if(data.error){
            console.log(data.error)
        }else{
            setData({...data , categories:data})
        }
    })
}

useEffect(() => {
    loadCategories()
}, [])

const searchData = ( ) => {
 
  if(search){
        list({search : search || undefined,catogory : catogory})
        .then(res => {
            if(data.error){
                console.log(res.error)
            }else{
                setData({...data,result:res,searched:true})
              
            }
        } )
    } 
    
}

const handleChange = (name) => event =>  {
 
    setData({...data,[name]:event.target.value,searched : false})
}

const searchSubmited = (e) => {
   e.preventDefault()
   searchData()

}

const searchMesagge = (searched , result) => {
    if(searched && result.length > 0){

        return `Found ${result.length} Products For '${data.search}'`
    }
    if(searched && result.length < 1){
        return `No Product Found  For'${data.search}'`
    }
}


const searchedProduct = (result=[] ) => {
    return (
        <>
       {
           searched?
           <h2 className='mb-5 mt-5 text-center'>
               {searchMesagge(searched , result)}
           </h2> : null

       } 
        <div className='row'>
            {
                result.map((p,i) =>{
                    return <Card key={i} product={p} />
                })
            }
        </div>
        </>
    )
}

const searchForm = () =>{
    return(  <form onSubmit={searchSubmited} className='mb-3'>
        <span className='input-group-text'>
            <div className='input-group input-group-lg'>
                <div className='input-group-prepend'>
                    <select className="btn mr-2" onChange={handleChange('catogory')}>
                        <option value='All'>All</option>
                        {
                            categories.map((c,i) => (
                                <option key = {i} value={c._id}>
                                    {c.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            <input type='search'
                className='form-control'
                onChange={handleChange('search')}
                placeholder='Search by name'
            />
            </div>
            <div className='btn input-group-append' style={{border : "none"}}>
                <button className='input-group-text'>Search</button>
            </div>
        </span>
    </form>
    )
}



    return (
        <div className='row'>
            <div className='container mb-3'>
                {searchForm()}
                {searchedProduct(result)}
            </div>
        </div>
    )
}

export default Search
