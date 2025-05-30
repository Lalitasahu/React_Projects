// import { useEffect, useState } from "react";

// const Profile = () => {
//     const [profile, setProfile] = useState(null);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             const response = await fetch("http://localhost:8000/api/user/me/", {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setProfile(data);
//                 console.log(data);
                
//             } else {
//                 console.error("Failed to fetch profile");
//             }
//         };

//         fetchProfile();
//     }, []);

//     if (!profile) return <p>Loading...</p>;

//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>Profile</h2>
//             <img src={profile.profile_pic} alt="proflie Image" />
//             <p><strong>Username:</strong> {profile.username}</p>
//             <p><strong>Email:</strong> {profile.email}</p>
//             <p><strong>First Name:</strong> {profile.first_name}</p>
//             <p><strong>Last Name:</strong> {profile.last_name}</p>
//             <p><strong>Phone Number:</strong> {profile.phone_no}</p>
//             <p><strong>Address:</strong> {profile.address}</p>
//             {profile.is_vendor && (
//             <p><strong>Is Vendor:</strong> Yes</p>
//             )}
//         </div>
//     );
// };

// export default Profile;

import { useEffect, useState } from "react";

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch("http://localhost:8000/api/user/me/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data);
                console.log(data);
            } else {
                console.error("Failed to fetch profile");
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return <p>Loading...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Profile</h2>
            <img src={'http://localhost:8000/'+profile.profile_pic} alt="Profile Image" />
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>First Name:</strong> {profile.first_name}</p>
            <p><strong>Last Name:</strong> {profile.last_name}</p>
            <p><strong>Phone Number:</strong> {profile.phone_no}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            {profile.is_vendor && (
                <p><strong>Is Vendor:</strong> Yes</p>
            )}
        </div>
    );
};

export default Profile;