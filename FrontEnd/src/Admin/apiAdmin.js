



export const createCategory = (token , name , userId) => {
    return fetch(`http://localhost:8000/api/catogory/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        },
        body: JSON.stringify(name)
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}

export const createProduct = (token , product , userId) => {
    return fetch(`http://localhost:8000/api/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
          
            'x-access-token': `${token}`
        },
        body: product
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}

export const getCategories = () => {
    return fetch(`http://localhost:8000/api/catogories`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
        
        }
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}