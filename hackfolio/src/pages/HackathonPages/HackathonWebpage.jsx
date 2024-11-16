import { useState,useEffect } from 'react'
import HackathonDetailsDisplay from '../../components/HackathonComponents/HackathonDetailsDisplay';
import HackathonTimingsDisplay from '../../components/HackathonComponents/HackathonTimingsDisplay';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import ReactingNavBar from '../../components/ReactingNavBar';

function HackathonWebpage() {
    const { name } = useParams();

    return(
        <>
        <div className='flex'>
            <ReactingNavBar/>
            <div className='space-y-3 size-full'>
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
            </div>
        </div>
              
        </>
    );     

}

export default HackathonWebpage