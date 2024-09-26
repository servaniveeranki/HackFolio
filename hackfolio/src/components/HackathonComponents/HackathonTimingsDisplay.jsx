import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../../styles/hack_info_card.css";

function HackathonTimingsDisplay() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [isJudge, setIsJudge] = useState(false);
    const [registered,setRegistered] = useState(false);
    const [flag,setFlag] = useState(0);

    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        checkIfJudge();
        getIfSubmitted();
        checkIfRegistered();
    },[data]);

    useEffect(() => {
        console.log(flag);
    },[flag]);

    async function getIfSubmitted() {
        try {
            const response = await fetch(`/api/project/hackathonProject/${name}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            if(arr.flag === true && flag<3) {
                setFlag(2);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function getInfo() {
        try {
            const response = await fetch(`/api/hackathon/updateHackDetails/${name}`);
            
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            setData(arr.data);
            const currTime = new Date();
            const fromTime = new Date(arr.data.fromDate);
            const toTime = new Date(arr.data.toDate);
            console.log(currTime,toTime);
            if(currTime > toTime && flag < 10) setFlag(10);
            else if(currTime > fromTime && flag<2) setFlag(1);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function checkIfRegistered() {
        try {
            const response = await fetch(`/api/hackathon/checkRegistration/${name}`);
            
            if (!response.ok) throw new Error('Network response was not ok');
            const data1 = await response.json();
            console.log(new Date(data.fromDate) < new Date() && !data1.flag);
            if(new Date(data.fromDate) < new Date() && !data1.flag && flag < 7) setFlag(7);
            setRegistered(data1.flag);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function checkIfJudge() {
        try {
            const response = await fetch(`/api/judge/isjudge/${name}`);
            
            if (response.ok) {
                setIsJudge(true); 
            } else {
                setIsJudge(false); 
            }
        } catch (error) {
            console.error('Error checking judge status:', error);
        }
    }

    async function handleClick() {
        if(flag === true) {
            navigate(`/hackathon/${name}/projectSubmission`);
        }
        else {
            try {
                const response = await fetch(`/api/hackathon/hackathonTeam/${name}/create`);
                console.log(response);
                if (!response.ok) throw new Error('Network response was not ok');
                const arr = await response.json();
                if(flag === 0) {
                    if (arr.flag === true) {
                        navigate(`/hackathon/${name}/editRegistrationDetails`);
                    } else {
                        navigate(`/hackathon/${name}/register`);
                    }
                }
                else if(flag === 1) {
                    navigate(`/hackathon/${name}/projectSubmission`);
                }
                else if(flag === 2) {
                    navigate(`/hackathon/${name}/EditProjectSubmission`);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }            
        }

    }

    if (data === null) return <div>Loading...</div>;

    return (
        <div className="hack-info-card flex flex-col justify-between" style={{ marginLeft: "30px" }}>
            <div>
                <div>From: {data.fromDate}</div>
                <div>To: {data.toDate}</div>
            </div>

            <div className='flex justify-center'>
                <button 
                    className="w-11/12 text-xl bg-indigo-600 text-white py-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
                    onClick={() => handleClick()}
                    disabled = { (flag===10 || flag===7) ? true : false }
                >
                    {
                        (flag === 10) ? <>Hackathon Ended</> : (flag === 7) ? <>Registration Ended</> : (flag === 2) ? <>Edit project</> : (flag === 1) ? <>Submit project</> : (registered) ? <>Go to dashboard</> : <>Apply now</>
                    }
                </button>
            </div>

            {isJudge && (
                <div className='flex justify-center mt-4'>
                    <button 
                        className="w-11/12 text-xl bg-green-600 text-white py-4 rounded-md font-semibold hover:bg-green-700 transition-colors"
                        onClick={() => navigate(`/hackathon/${name}/judgeDashboard`)}
                    >
                        Judge Dashboard
                    </button>
                </div>
            )}
        </div>
    );
}

export default HackathonTimingsDisplay;
