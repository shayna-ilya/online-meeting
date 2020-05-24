import React from 'react';

const STARTS_FROM = '12.31.1999';

const getPutinDate = () => {
  const putinDate = new Date(STARTS_FROM);
  const now = new Date();
  const diffInTime = now.getTime() - putinDate.getTime();
  console.log('diff in time', diffInTime);
  const diffInDays = diffInTime / (1000 * 3600 * 24);
  const diffInYears = diffInDays / 365;

  return diffInDays;
};

export const Putin: React.FC = () => {
  return <p>{`Путин у власти уже: ${getPutinDate()}`}</p>;
};
