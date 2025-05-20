import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import "./form.css"

function CreatUser() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const[username,setusername] = useState("");
    const[first_name,setfirstname] = useState("");
    const[last_name, setlastname] = useState("");
    const[email,setemail] = useState("");
    const[address, setaddress] = useState("");
    const[password, setpassword] = useState("");
    const[phone_no, setphone_no] = useState("");
    const [is_vendor, setis_vendor] = useState(false);
    const[profile_pic, setprofile_pic] = useState("")
    
    useEffect(()=>{
        if (id){
            fetch(`http://localhost:8000/api/User/${id}/` ,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            })
            .then((res) => res.json())
            .then((data)=>{
                setusername(data.username);
                setfirstname(data.first_name);
                setlastname(data.last_name);
                setemail(data.email);
                setaddress(data.address);
                setphone_no(data.phone_no);
                setis_vendor(data.is_vendor);
                setprofile_pic(data.profile_pic);
            })
        }
    }, [id]); 


    const submit = async(e)=>{
        e.preventDefault();

        const Userdata = {
            username,
            first_name,
            last_name,
            email,
            address,
            password: password || undefined,
            phone_no,
            is_vendor: is_vendor === true || is_vendor === "yes",
            profile_pic, 
        };
        console.log(Userdata);
        
        const url = id
            ?`http://localhost:8000/api/User/${id}/`
            :`http://localhost:8000/api/User/`;
        const method = id ? "PUT" : "POST";
        
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Userdata),
        
        });
        if (response.ok) {
            alert(`User ${id ? "updated" : "created"} successfully`);
            navigate("/Login");
        } else {
            alert("Failed to save user");
        }
        }

    return (
        <div className="form-container">
          <h1>{id ? "Edit" : "Create"} User</h1>
          <form onSubmit={submit}>
            <div className="form-group">
              <label>User Name:</label>
              <input type="text" value={username} onChange={(e) => setusername(e.target.value)} />
            </div>
      
            <div className="form-group">
              <label>First Name:</label>
              <input type="text" value={first_name} onChange={(e) => setfirstname(e.target.value)} />
            </div>
      
            <div className="form-group">
              <label>Last Name:</label>
              <input type="text" value={last_name} onChange={(e) => setlastname(e.target.value)} />
            </div>
      
            <div className="form-group">
              <label>Email:</label>
              <input type="text" value={email} onChange={(e) => setemail(e.target.value)} />
            </div>
      
            <div className="form-group">
              <label>Address:</label>
              <input type="text" value={address} onChange={(e) => setaddress(e.target.value)} />
            </div>
      
            <div className="form-group">
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
            </div>
      
            <div className="form-group">
              <label>Phone Number:</label>
              <input type="tel" value={phone_no} onChange={(e) => setphone_no(e.target.value)} />
            </div>
      
            <div className="form-group">
              <label>Is Vendor</label>
              <input type="checkbox" checked={is_vendor} onChange={(e) => setis_vendor(e.target.checked)} />
            </div>
      
            <div className="form-group">
              <label>Upload Image:</label>
              <input type="file" accept="image/*" onChange={(e) => setprofile_pic(e.target.files[0])} />
            </div>
      
            <div className="form-group">
              <button type="submit">{id ? "Update" : "Submit"}</button>
            </div>
          </form>
        </div>
    );
}


export default CreatUser ;