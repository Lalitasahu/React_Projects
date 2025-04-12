
const Heading = ({data}) =>{
  return <>
    <h1>this is custom heading by {data}</h1>
  
  </>
}


const Pera = ()=>{
  return<>
  <h1>this is my second pera </h1>
  </>
}



function myapp() {
  return (
    // Fragment  <></>
    <> 
    <Pera />
    <Heading data={"Lalita"} />
    <h1>hello</h1>
    <p>this is my first react page</p>
    <h3></h3>
    </>
  );
}


export default myapp;
