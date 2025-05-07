import React from 'react'

import { useEffect, useState } from 'react'

const Home = () => {
  const [review, setReview] = useState({})
  const getreviews = async() => {
    let url = 'http://localhost:8000/api/Reviews/'
    const response = await fetch(url)
    setReview(await response.json())
  }  

  console.log(review)
  return (
  <>
    <h1 onClick={()=>getreviews()}>Reviews</h1>
    {review?.results?.map((e,index)=>{
      return <>
      <div className='review-card'>
        <h3>comment:{e.comment}</h3>
        <p>Product Id: {e.product_id}</p>
        <p>Product Id: {e.product_id}</p>
        <p>Created date: {e.created_at}</p>
        <p>Rating: {e.rating}</p>
      </div>
      </>
    })}
  </>
  )
}

export default Home


