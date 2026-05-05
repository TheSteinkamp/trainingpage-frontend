import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Card, Row, Col, Container, Badge } from "react-bootstrap";
import "../styles/Timer.css";
import { useSound } from 'react-sounds';

const Timer = () => {
    const [time, setTime] = useState(0);
    const [restTime, setRestTime] = useState(0);
    const [noOfIntervals, setNoOfIntervals] = useState(1);
    const [start, setStart] = useState(false);
    const [isWorkPhase, setIsWorkPhase] = useState(true);
    const [currentInterval, setCurrentInterval] = useState(1);
    const [activeTime, setActiveTime] = useState(0);
    const { play } = useSound('notification/warning');
    //const location = useLocation();

    //const exercise = location.state?.exercise;
    //const session = location.state?.session;

    let seconds = ("0" + (Math.floor((time / 1000) % 60))).slice(-2);
    let minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    let restSeconds = ("0" + (Math.floor((restTime / 1000) % 60))).slice(-2);
    let restMinutes = ("0" + Math.floor((restTime / 60000) % 60)).slice(-2);

    useEffect(() => {
        let interval = null;
        if (start) {
            interval = setInterval(() => {
                setActiveTime((prevTime) => {
                    if (prevTime <= 0) {
                        return 0;
                    }
                    return prevTime - 10;
                });
            }, 10);
        }
        return () => clearInterval(interval);
    }, [start]);

    useEffect(() => {
        if (start && activeTime === 0) {
            if (isWorkPhase) {
                setIsWorkPhase(false);
                setActiveTime(restTime);
                play();
            } else {
                if (currentInterval < noOfIntervals) {
                    setCurrentInterval(prevTime => prevTime + 1);
                    setIsWorkPhase(true);
                    setActiveTime(time);
                    play();
                } else {
                    setStart(false);
                    play();
                }
            }
        }
    }, [activeTime, start, isWorkPhase, currentInterval, noOfIntervals, restTime, time]);

    const handleStart = () => {
        if (time > 0) {
            setActiveTime(time);
            setIsWorkPhase(true);
            setCurrentInterval(1);
            setStart(true);
        }
    };

    const handleReset = () => {
        setStart(false);
        setTime(0);
        setRestTime(0);
        setActiveTime(0)
        setNoOfIntervals(1);
        setCurrentInterval(1);
    }

    const adjustTime = (type, amount) => {
        if (!start) {
            if (type === 'work') setTime(prevTime => Math.max(0, prevTime + amount));
            if (type === 'rest') setRestTime(prevTime => Math.max(0, prevTime + amount));
        }
    };

    return (
        <Container className="py-4">
            <Card className="shadow-sm p-4 text-center">
                <div className="mb-4">
                    {start && <Badge bg={isWorkPhase ? "danger" : "success"} className="fs-4">
                        {isWorkPhase ? "WORK!" : "REST"}
                    </Badge>
                    }
                    <div className="display-1 fw-bold">
                        {("0" + (Math.floor((activeTime / 1000) % 60))).slice(-2)}:
                        {("0" + (Math.floor((activeTime % 1000) / 10))).slice(-2)}
                    </div>
                    <p>round {currentInterval} of {noOfIntervals}</p>
                </div>

                <Row className="mb-3">
                    <Col>
                        <h6>Training interval</h6>
                        <Button variant="outline-dark" size="sm" onClick={() => adjustTime('work', 10000)}>+10s</Button>
                        <Button variant="outline-dark" size="sm" onClick={() => adjustTime('work', 1000)}>+1s</Button>
                        <div className="fs-4">{minutes}:{seconds}</div>
                        <Button variant="outline-dark" size="sm" onClick={() => adjustTime('work', -10000)}>-10s</Button>
                        <Button variant="outline-dark" size="sm" onClick={() => adjustTime('work', -1000)}>-1s</Button>
                    </Col>
                    <Col>
                        <div className="mb-3">
                            <h6>Number of intervals: {noOfIntervals}</h6>
                            <Button variant="outline-dark" size="sm" onClick={() => setNoOfIntervals(prev => Math.max(1, prev - 1))}>–</Button>
                            <Button variant="outline-dark" size="sm" onClick={() => setNoOfIntervals(prev => Math.max(1, prev + 1))}>+</Button>
                            </div>
                        <Button className="btn-start-custom" size="lg" onClick={handleStart} disabled={start}>Start timer</Button><br></br>
                        <Button className="btn-stop-custom" size="sm" onClick={() => setStart(false)}>Stop</Button>
                        <Button className="btn-reset-custom" size="sm" onClick={handleReset}>Reset</Button>
                    </Col>
                    <Col>
                        <h6>Rest interval</h6>
                        <Button variant="outline-dark" size="sm" onClick={() => adjustTime('rest', 10000)}>+10s</Button>
                        <Button variant="outline-dark" size="sm" onClick={() => adjustTime('rest', 1000)}>+1s</Button>
                        <div className="fs-4">{restMinutes}:{restSeconds}</div>
                        <Button variant="outline-dark" size="sm" onClick={() => adjustTime('rest', -10000)}>-10s</Button>
                        <Button variant="outline-dark" size="sm" onClick={() => adjustTime('rest', -1000)}>-1s</Button>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default Timer;