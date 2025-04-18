import React from 'react'


const Contact = () => {
  return (
    <div>
      <div className='service'>
        <h1>All Our Services</h1>
        <form >
          <input className='search-bar' type="text" name="search" placeholder="Search...." />
          <button className='search-bar-b' type="submit">search</button> 
        </form>
      </div>  
      <h4>offers a wide range of services and products for beginners and professionals,
      helping millions of people everyday to learn and master new skills</h4>  
    </div>
  )
}

export default Contact