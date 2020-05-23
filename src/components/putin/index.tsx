import React from 'react';

const STARTS_FROM = '31.12.1999';

export const Putin: React.FC = () => {
  const getPutinDate = () => {
    const date = new Date(STARTS_FROM);
    return date;
  };

  return <p>{`Путин у власти уже: ${getPutinDate()}`}</p>;
};
