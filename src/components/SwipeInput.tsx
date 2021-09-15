import { useEffect, useRef, useState } from 'react';
import { useGesture } from 'react-use-gesture';

interface Props {
  label: string;
  values: string[];
}

const VALUES = [0, 1, 2, 3, 5, 8, 13, 21];

const SwipeInput = ({ label, values = VALUES }) => {
  const [position, setPosition] = useState(0);
  const [delta, setDelta] = useState(0);
  const lastPosition = useRef(0);

  const bind = useGesture({
    onDrag: ({ active, velocities, distance }) => {
      const direction = -Math.sign(velocities[1]);
      const ratio = values.length / (values.length * 50);
      if (active) {
        setDelta(Math.round(distance * direction * ratio));
      }
    },
  });

  useEffect(() => {
    updatePosition(delta);
  }, [delta]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    e.preventDefault();
    const increment = e.shiftKey ? 3 : 1;
    switch (e.code) {
      case 'ArrowUp':
        updatePosition(increment);
        break;
      case 'ArrowDown':
        updatePosition(-increment);
        break;
    }
  };

  const updatePosition = (delta: number) => {
    if (delta === 0) return;

    let next = lastPosition.current + delta;
    if (next < 0) next = 0;
    if (next > values.length - 1) next = values.length - 1;
    setPosition(next);
    lastPosition.current = next;
  };

  return (
    <div {...bind()} className='flex flex-col p-2 text-center rounded-box select-none outline-none focus-within:ring-secondary-focus focus-within:ring-1 focus-within:transition-colors'>
      <span>{label}</span>
      <span className='countdown shadow-inner-md font-mono text-4xl px-1 rounded-md'>
        <span className={`fibonacci${values[position]} outline-none`} tabIndex={1} onKeyDown={handleKeyPress}></span>
      </span>
    </div>
  );
};

export default SwipeInput;
