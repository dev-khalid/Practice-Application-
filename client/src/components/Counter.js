import React,{useState,useEffect} from 'react'

const Counter = () => {
  const [count,setCount] = useState(0); 
  const [time,setTime] = useState(new Date()); 
  const tick = () => { 
    setTime(new Date()); 
  }
  useEffect(() => { 
    //component update er kaj korche eita and componentDidMount() er o kaj korche render howar somoy 
    console.log('Component Mounted and updated for count')
    document.title = `Clicked ${count} times` 
    
  },[count])
  useEffect(() => { 
    //component did mount er kaj korche 
    console.log('eita to ekbar e call howa ucit . lets see'); 
    const interval = setInterval(tick,1000);   
    return () => {
      console.log('component unmounted'); clearInterval(interval); }
  },[])
  return (
    <>
      <p>
        {time.toLocaleTimeString('bn-BD')}
      </p>
      <button type='button' onClick={() => setCount((count) => count+1)} >Add</button> 

    </>
  )
}

export default Counter
