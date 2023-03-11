import { useState, useEffect } from "react";
import "./App.css"
function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      clearInterval(interval);
      setTimerLabel((timerLabel) =>
        timerLabel === "Session" ? "Break" : "Session"
      );
      setTimeLeft(timerLabel === "Session" ? breakLength * 60 : sessionLength * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, breakLength, sessionLength, timerLabel]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60);
    setTimerLabel("Session");
  };

  const decrementSessionLength = () => {
    if (!isRunning && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const incrementSessionLength = () => {
    if (!isRunning && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const decrementBreakLength = () => {
    if (!isRunning && breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementBreakLength = () => {
    if (!isRunning && breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };
  return (
    <div class="clock-container">
    <h1>25 + 5 Clock</h1>
    <div class="length-control-container">
      <div id="session-label">Session Length</div>
      <div class="length-control">
        <button id="session-decrement" onClick={decrementSessionLength}>-</button>
        <div id="session-length">{sessionLength}</div>
        <button id="session-increment" onClick={incrementSessionLength}>+</button>
      </div>
      <div id="break-label">Break Length</div>
      <div class="length-control">
        <button id="break-decrement" onClick={decrementBreakLength}>-</button>
        <div id="break-length">{breakLength}</div>
        <button id="break-increment" onClick={incrementBreakLength}>+</button>
      </div>
    </div>
    <div class="timer-container">
      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>
    </div>
    <div class="controls-container">
      <button id="start_stop" onClick={startStop}>{isRunning ? "Stop" : "Start"}</button>
      <button id="reset" onClick={reset}>Reset</button>
    </div>
  </div>
  )}
  export default App;