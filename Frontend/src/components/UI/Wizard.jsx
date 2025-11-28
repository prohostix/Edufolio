import React, { useState } from 'react';

const Wizard = () => {
    const [step, setStep] = useState(1);

    return (
        <div style={{ textAlign: 'center' }}>
            {step === 1 && (
                <div>
                    <h3>What allows you to study best?</h3>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                        <button onClick={() => setStep(2)} style={btnStyle}>Video Lectures</button>
                        <button onClick={() => setStep(2)} style={btnStyle}>Live Classes</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h3>What is your budget range?</h3>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                        <button onClick={() => setStep(3)} style={btnStyle}>Under $5k</button>
                        <button onClick={() => setStep(3)} style={btnStyle}>$5k - $10k</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h3 style={{color: '#16a34a'}}>Recommendation Found!</h3>
                    <p>Based on your choices, we recommend <strong>Online MBA</strong>.</p>
                    <button onClick={() => setStep(1)} style={{...btnStyle, background: '#0F172A', color:'white'}}>Start Over</button>
                </div>
            )}
        </div>
    );
};

const btnStyle = {
    padding: '10px 20px',
    border: '1px solid #ddd',
    background: 'white',
    cursor: 'pointer',
    borderRadius: '6px'
};

export default Wizard;