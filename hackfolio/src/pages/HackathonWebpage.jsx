import { useState,useEffect } from 'react'
import HackathonDetailsDisplay from '../components/HackathonDetailsDisplay';
import HackathonTimingsDisplay from '../components/HackathonTimingsDisplay';
import Header from '../components/header';
import { useParams } from 'react-router-dom';

function HackathonWebpage() {
    const { name } = useParams();

    return(
        <>
            <Header></Header>
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{marginTop:"30px"}}>
                    {/* <div style={{height:"300px",width:"100px"}}/> */}
                    <div className="flex">
                        <div>
                            <HackathonDetailsDisplay name={name}/>
                        </div>
                        <div>
                            <HackathonTimingsDisplay id={name}/>
                        </div>
                    </div>
                </div>
            </div>   
        </>
    );     

}

export default HackathonWebpage