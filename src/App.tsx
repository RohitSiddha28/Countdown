import React, { useEffect, useState } from "react";

const targetDate = new Date("2026-04-26T00:00:00");

const getTimeRemaining = (target: Date) => {
  const total = target.getTime() - Date.now();

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
};

const format = (num: number) => String(num).padStart(2, "0");

const DigitBox = ({ digit }: { digit: string }) => {
  return (
    <div className="bg-black text-white text-4xl md:text-6xl font-bold w-14 h-20 md:w-20 md:h-28 flex items-center justify-center rounded-xl shadow-lg">
      {digit}
    </div>
  );
};

const TimeBlock = ({ value, label }: { value: number; label: string }) => {
  const formatted = format(value);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        <DigitBox digit={formatted[0]} />
        <DigitBox digit={formatted[1]} />
      </div>
      <span className="text-sm md:text-lg text-gray-400">{label}</span>
    </div>
  );
};

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(
    getTimeRemaining(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getTimeRemaining(targetDate);

      if (updated.total <= 0) {
        clearInterval(interval);
      }

      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft.total <= 0) {
    return (
      <div className="h-screen flex items-center justify-center text-4xl font-bold">
        🎉 Happy Birthday to youuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 🎉!
      </div>
    );
  }

  return (
    <div className="h-screen bg-linear-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center gap-10">
      
      <h1 className="text-3xl md:text-5xl font-bold text-center">
        Hey, it's coming! 😏🫣
      </h1>

      <div className="flex gap-6 md:gap-10">
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>

    </div>
  );
};

export default App;