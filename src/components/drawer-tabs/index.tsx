import React, { ChangeEvent } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

type Props = {
  value: number,
  onChange(event: React.ChangeEvent<{}>, newValue: number): void,
  indicatorColor?: 'primary' | 'secondary',
  textColor?: 'primary' | 'secondary' | 'inherit',
  centered?: boolean,
  tabsLabels: string[],
};

export const DrawerTabs: React.FC<Props> = ({ value, onChange, indicatorColor, textColor, centered, tabsLabels }) => {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      indicatorColor={indicatorColor || 'primary'}
      textColor={textColor || 'primary'}
      centered={centered || true}
    >
      {tabsLabels.map((label: string, index: number) => (
        <Tab key={`${value}-${label}`} label={label} />
      ))}
    </Tabs>
  );
};
