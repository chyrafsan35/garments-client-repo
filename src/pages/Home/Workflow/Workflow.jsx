import React, { useState } from 'react';
import FlowCard from '../../../components/FlowCard/FlowCard';

const Workflow = () => {
    const steps = fetch('/workflow.json').then(res=>res.json()).then(data=>setStepsData(data));
    const [stepsData, setStepsData] = useState([]);
    // console.log(steps);

    return (
        <div className='py-[50px] text-[#1A1A1A]'>
            <h2 className='text-center py-4 font-semibold text-xl'>How It Works</h2>
            <div className='flex justify-center items-center gap-4 flex-col md:flex-row'>
                {
                    stepsData.map(steps=><FlowCard steps={steps} key={steps.id}></FlowCard>)
                }
            </div>
        </div>
    );
};

export default Workflow;