import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Pro_detail = () => {
    
    const[Detail, setDetail] = useState(null);
    const { id } = useParams();

    const getDetail = async () => {
        const response = await fetch(`http://localhost:8000/api/Product/${id}/`);
        const data = await response.json();
        console.log("Fetched product detail:", data);
        setDetail(data);  
    };

    useEffect(() => {
        getDetail();
    }, [id]);

    // console.log(
        // Detail.image_list.replace('[','').replace(']','').split(',')
        // Detail.image_list.replace('[','').replace(']','').replace(/\'/g,'').split(',')
    // )

    if (!Detail) return <p>Loading...</p>;
    // console.log(JSON.stringify(Detail.image_list))

    return (
        <div>
            <h1>{Detail.title}</h1>
            <p>{Detail.price}</p>
            {
                Detail.image_list.replace('[','').replace(']','').replace(/\'/g,'').split(',').map((e,index)=>{
                    return <img 
                        key={index}
                        src={e}
                        alt={`Product image ${index + 1}`}
                        style={{ width: "150px", height: "auto", borderRadius: "8px" }}
                    />  
                })
            }
        </div>
    );
};

export default Pro_detail;
