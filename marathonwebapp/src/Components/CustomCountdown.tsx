import { useState, useEffect } from "react";
import { memo } from "react";

const Countdown = (props: { targetDate: string }) => {
  // Props
  const { targetDate } = props;
  // State
  const [timeLeft, setTimeLeft] = useState<{ [type: string]: string }>(
    calculateTimeLeft(targetDate)
  );

  // Update the countdown once every second
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearTimeout(timer);
  });

  // Function to calculate the time left until the target date
  function calculateTimeLeft(target: string) {
    const difference = +new Date(target) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      timeLeft = {
        days: `${Math.floor(difference / (1000 * 60 * 60 * 24))}`,
        hours: `${hours < 10 ? "0" : ""}${hours}:`,
        minutes: `${minutes < 10 ? "0" : ""}${minutes}:`,
        seconds: `${seconds < 10 ? "0" : ""}${seconds}`,
      };
    }
    return timeLeft;
  }

  // Function to format the time left into a string
  function formatTimeLeft(time: { [type: string]: string }) {
    // eslint-disable-next-line array-callback-return
    return Object.keys(time).map((interval) => {
      if (time[interval]) {
        switch (interval) {
          case "days":
            return `${time[interval]} ${interval} `;
          default:
            return `${time[interval]}`;
        }
      }
    });
  }

  return (
    <div className="countdownText">
      {Object.keys(timeLeft).length ? (
        formatTimeLeft(timeLeft)
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  );
};

export default memo(Countdown);
