import React, { useState } from 'react'

const RadioBox = ({prices,handleFilter}) => {


    const [value , setValue] = useState(0) 

    const handleChange = (e) =>{
        handleFilter(e.target.value,'price')
        setValue(e.target.value)
    }




    return (
        <>
           {prices.map((item , i) => {
             return  <div key={i}>
                
                        <input type='radio' className='mr-2  ml-4'
                            onChange={handleChange}
                            value={`${item._id}`} 
                            name={item}                       
                        />
                        <label   className='form-check-label'>{item.name}</label>

                    </div>
           
           })

           }
            
            
        </>
    )
}

export default RadioBox
