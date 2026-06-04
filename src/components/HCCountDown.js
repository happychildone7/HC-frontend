import { useState, useEffect } from 'react';
import '../styles/HCCountDown.css';

const HCCountDown = ({ startDate, startTime }) => {
    
    const [timeLeft, setTimeLeft] = useState({});
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if(!startDate) return;
        const [year, month, day] = startDate.split('-').map(Number);
        const targetDate = new Date(startDate); 
        
        // Parse time and add to date
        if (startTime) {
            const [hours, minutes] = startTime.split(':').map(Number);
            targetDate.setHours(hours);
            targetDate.setMinutes(minutes);
        }
    
        console.log('Parsed target:', targetDate.toISOString()); 
        
        if (isNaN(targetDate.getTime())) {
            console.error('Invalid date:', startDate, startTime);
        return;
        }
        
        const timer = setInterval(() => {
            const distance = targetDate.getTime() - new Date().getTime();
            
            if (distance < 0) {
                setIsExpired(true);
                clearInterval(timer);
                return;
            }
            
            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, [startDate, startTime]);

    if (isExpired) {
        return (
        <div className="countdown-card expired">
            <h3 className="countdown-title">Event Started!</h3>
        </div>
        );
    }

    return (
        <div className="countdown-card">
            <h2 className="countdown-subtitle">Time Until Event</h2>
            <div className="countdown-item">
                <span className="countdown-number">{timeLeft.days || 0}</span>
                <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-display">
                <div className="countdown-item">
                    <span className="countdown-number">{timeLeft.hours?.toString().padStart(2, '0') || '00'}</span>
                    <span className="countdown-label">Hrs</span>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-item">
                    <span className="countdown-number">{timeLeft.minutes?.toString().padStart(2, '0') || '00'}</span>
                    <span className="countdown-label">Min</span>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-item">
                    <span className="countdown-number">{timeLeft.seconds?.toString().padStart(2, '0') || '00'}</span>
                    <span className="countdown-label">Sec</span>
                </div>
            </div>
        </div>
    );
};

export default HCCountDown;
