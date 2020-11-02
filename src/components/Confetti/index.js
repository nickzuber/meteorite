/** @jsx jsx */

import {css, jsx} from '@emotion/core';

function color(rand) {
  // const c = [
  //   '#4caf50',
  //   '#e91e63',
  //   '#4C84FF',
  //   '#e6d435',
  //   '#B424E6',
  // ];
  const c = ['#B424E6', '#1ACA6B', '#E62465', '#FFCD4C', '#4C84FF', '#E9519A'];
  return c[~~(c.length * rand)];
}

function opacity(xid, max) {
  // Max value (best possible score).
  const cap = 1;
  // Best value to base distribution on (the center value).
  const best = Math.floor(max / 2);
  // How spread out the distribution is from the best value.
  const distribution = 8;
  const result = Math.min(
    1,
    cap *
      Math.pow(
        Math.E,
        -0.5 * (Math.pow(xid - best, 2) / Math.pow(distribution, 2))
      )
  );
  return Math.max(1 - result, 0.05) * 1.75;
}

function range(min, max, rand) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rand * (max - min + 1)) + min;
}

function getConfetti(seed) {
  const stroke = color(seed);
  const rotation = ~~(seed * 180);

  const svgs = [
    <svg
      css={css`
        transform: rotate(${rotation}deg);
      `}
      width="12"
      height="9"
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 0L11.1962 9H0.803848L6 0Z" fill={stroke} />
    </svg>,
    <svg
      css={css`
        transform: rotate(${rotation}deg);
      `}
      width="12"
      height="9"
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 0L11.1962 9H0.803848L6 0Z" fill={stroke} />
    </svg>,
    <svg
      css={css`
        transform: rotate(${rotation}deg);
      `}
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C0.517508 6.06139 6.6799 11.5502 2 16"
        stroke={stroke}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>,
    <svg
      css={css`
        transform: rotate(${rotation}deg);
      `}
      width="8"
      height="13"
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 0L8 6.5L4 13L0 6.5L4 0Z" fill={stroke} />
    </svg>,
    <svg
      css={css`
        transform: rotate(${rotation}deg);
      `}
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 6.6393C8 9.44331 2.33469 14 0.577298 14C-1.1801 14 1.63591 9.44331 1.63591 6.6393C1.63591 3.83529 -0.119245 0 1.63815 0C3.39555 0 8 3.83529 8 6.6393Z"
        fill={stroke}
      />
    </svg>,
    <svg
      css={css`
        transform: rotate(${rotation}deg);
      `}
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.15408 5.477C8.15168 8.67191 7 13.5 5.15408 11.5C3.30816 9.5 2.90284 9.34138 1.15517 5.47695C-2.00009 -1.49991 3.99732 1.50011 5.15408 3.977C6.15408 1.47707 11.5 -2 9.15408 5.477Z"
        fill={stroke}
      />
    </svg>,
    <svg
      css={css`
        transform: rotate(${rotation}deg);
      `}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5" cy="5" r="5" fill={stroke} />
    </svg>
  ];
  // css={css`transform: rotate(${rotation}deg);`}

  return svgs[~~(seed * svgs.length)];
}

const Confetti = ({offset, row, seed, index, max}) => {
  const start = row * 160;
  const end = start + 160;
  const topDelta = range(start, end, seed) - 120;
  const fade = opacity(index, max);
  offset -= 320;
  return (
    <div
      css={css`
        z-index: 1;
        opacity: ${fade};
        transform: scale(1.2);
        position: absolute;
        left: ${offset}px;
        top: ${topDelta}px;
      `}
    >
      {getConfetti(seed)}
    </div>
  );
};

export default function ConfettiSection({spacing = 82, amount = 18}) {
  const row = new Array(amount).fill(0).map((_, i) => i * spacing);

  return (
    <div
      css={css`
        z-index: 0;
      `}
    >
      {row.map((offset, i) => (
        <Confetti
          index={i}
          row={0}
          offset={offset}
          seed={Math.random()}
          max={amount}
        />
      ))}
      {row.map((offset, i) => (
        <Confetti
          index={i}
          row={1}
          offset={offset}
          seed={Math.random()}
          max={amount}
        />
      ))}
      {row.map((offset, i) => (
        <Confetti
          index={i}
          row={2}
          offset={offset}
          seed={Math.random()}
          max={amount}
        />
      ))}
      {row.map((offset, i) => (
        <Confetti
          index={i}
          row={3}
          offset={offset}
          seed={Math.random()}
          max={amount}
        />
      ))}
      {row.map((offset, i) => (
        <Confetti
          index={i}
          row={4}
          offset={offset}
          seed={Math.random()}
          max={amount}
        />
      ))}
      {row.map((offset, i) => (
        <Confetti
          index={i}
          row={5}
          offset={offset}
          seed={Math.random()}
          max={amount}
        />
      ))}
    </div>
  );
}
