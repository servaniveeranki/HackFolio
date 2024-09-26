import { useState, useEffect } from "react";
import HackathonsDisplayCard from "../../components/HackathonComponents/HackathonsDisplayCard";
import Header from "../../components/Header";
import "../../styles/hack_card.css"

function AllHackathonsDisplay() {
    const [data,setData] = useState([]);

    async function getData() {
        try {
            const response = await fetch(`/api/hackathon`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const array = await response.json();
            setData(array);
    
        } catch (error) {
            console.error('Error posting data:', error);
        }
    } 

    useEffect(()=> {
        getData();
    },[])

    return(
        <div className="">
            <Header />
            <div className="flex justify-center">
                <div className="flex flex-wrap justify-center w-4/5">
                    {
                        data.map((element,i) => {
                            return <HackathonsDisplayCard key={i} data={element}/>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default AllHackathonsDisplay