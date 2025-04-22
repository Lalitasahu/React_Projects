import React from 'react'

const Contact = () => {
  return (
    <>
      <div>
          
      <h1> User Login </h1>
      </div>
      <br />
      <form >
            
        <label for="username">User Name: </label>
        <input type="text"  name="username" placeholder="Enter username" />

        <br />
        <br />
        <label for="password">Password: </label>
        <input type="password" name="password" placeholder="Enter Password" />
        <br />
        <br />
        <button
          className="px-4 py-2 
            bg-blue-500 text-white 
            font-semibold rounded-lg 
            shadow hover:bg-blue-600 
            focus:outline-none focus:ring-2 focus:ring-blue-300 
            transition duration-200
          " >
          Login
        </button>
      </form>
      </>
  )
}

export default Contact