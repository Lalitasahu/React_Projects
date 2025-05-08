import { useEffect, useState } from "react"


function MyForm() {

    const[username,setusername] = useState("");
    const[first_name,setfirstname] = useState("");
    const[last_name, setlastname] = useState("");
    const[email,setemail] = useState("");
    const[address, setaddress] = useState("");
    const[password, setpassword] = useState("");
    const[phone_no, setphone_no] = useState("");
    const[is_vendor, setis_vendor] = useState("");
    const[profile_pic, setprofile_pic] = useState("")
    


    const submit = async(e)=>{
        e.preventDefault();


        // const Userdata = {
        //     username: username,
        //     firstname: firstname, 
        //     lastname: lastname,
        //     email: email,
        //     address: address,
        //     password: password,
        //     phone_no: phone_no,
        //     is_vendor: is_vendor == "yes",  
        // }; 

        // const [profile_pic, setprofile_pic] = useState("");

        const Userdata = {
            username,
            first_name,
            last_name,
            email,
            address,
            password,
            phone_no,
            is_vendor: is_vendor === "yes",
            profile_pic, 
        };
        console.log(Userdata);
        
        const response = await fetch("http://localhost:8000/api/User/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Userdata),
        
        });

        }

   
    return (
        <>
            <h1>Create New User</h1>
            <form onSubmit={submit}>
                
                <label>User Name: </label>
                <input type="text"
                 value={username}
                 onChange={(e)=> setusername(e.target.value)}
                 >
                </input><br /><br />
                
                <label >First Name: </label>
                <input type="text"
                    value={first_name}
                    onChange={(e)=> setfirstname(e.target.value)}
                 /><br /><br />

                <label>Last Name: </label>
                <input type="text"
                value={last_name}
                onChange={(e)=> setlastname(e.target.value)}
                >
                </input><br /><br />

                <label>Email: </label>
                <input type="text"
                 value={email}
                 onChange={(e)=> setemail(e.target.value)}
                /> <br /><br />

                <label>Address: </label>
                <input type="text"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                /><br /> <br />

                <label>password: </label>
                <input type="password" 
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                /><br /> <br />

                <label>Phone Number: </label>
                <input type="tel" 
                    value={phone_no}
                    onChange={(e)=> setphone_no(e.target.value)}
                /> <br /><br />

                <label>Is Vendor</label>
                <input type="checkbox"
                    value={is_vendor}
                    onChange={(e)=> setis_vendor(e.target.value)}
                /> <br /><br />

                <button type="submit">
                    Submit
                </button>
            </form>

        </>
    )
}


export default MyForm ;