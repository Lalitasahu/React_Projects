import './Layout.css'
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  
  return (
    <>
      <nav>
        <ul>
          <div className='nav'>
            <div className='gap'>
              <Link to="/"><img src='/logo192.png' alt='logo' style={{height:"50px",objectFit:'cover'}} /></Link>
            
              <li>
                <Link  to="/">Home</Link>
              </li>
              <li>
                <Link  to="/tutorials">Tutorials</Link>
              </li>
              <li>
                <Link to="/exercises">Exercises</Link>
              </li>
              <li>
                <Link to="/certified">Certified</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
            </div>
            <div className='gap'>
              <div>
                <form >
                  <input className='search-bar' type="text" name="search" placeholder="Search...." />
                  <button className='search-bar-b' type="submit">search</button> 
                </form>
              </div>
              
              <div class="toggle-container">
                <button class="btn active"> <Link  to='/sign_up'>Sign Up</Link></button>
                <button class="btn"><Link  to="/login">Login </Link></button>
              </div>
            </div>
          </div>
          <div className='nav-b'>
            
            <div>
              <Link to = "/HTML">HTML</Link>
            </div>

            <div>
            <Link to = "/Javascript">JAVASCRIPT</Link>
              </div>
            <div>

              <Link to = "/CSS">CSS</Link>
            </div>

            <div>
              <Link to = "/SQL">SQL</Link>
            </div>

            <div>
              <Link to = "/Python">PYTHON</Link>
            </div>

            <div>
              <Link to="/React">REACT</Link>
            </div>

            <div>
              <Link to="/Jquery">JQUERY</Link>
            </div>

            <div><Link to ="/C">C</Link> </div>

            <div>JAVA</div>  
            <div>JAVA</div>  
            <div>JAVA</div>  
            <div>JAVA</div>  
            <div>JAVA</div>  
            <div>JAVA</div>  
          </div>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
