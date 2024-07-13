import { ImportExport } from '@material-ui/icons';
import _ from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unitsSelector } from 'store/selectors';
import { notificationsStore } from 'store/slices';
import { IUnit } from 'types/unit';

import MenuItem from '../MenuItem';

const downloadArmy = (army: IUnit[]) => {
  const data = encodeURIComponent(JSON.stringify({ units: army }));
  // eslint-disable-next-line no-undef
  const a = document.createElement('a');
  a.href = `data:text/json;charset=utf-8,${data}`;
  a.download = `army.json`;
  a.click();
};

interface IExportArmyItemProps {
  onClick?: () => void;
  mini?: boolean;
}

const ExportArmyItem = ({ onClick, mini }: IExportArmyItemProps) => {
  const dispatch = useDispatch();
  const units = useSelector(unitsSelector, _.isEqual);

  const exportArmy = () => {
    downloadArmy(units);
    dispatch(notificationsStore.actions.addNotification({ message: 'Exported Army', variant: 'success' }));
    if (onClick) onClick();
  };

  return <MenuItem label="Export Army" icon={<ImportExport />} onClick={exportArmy} mini={mini} />;
};

export default ExportArmyItem;
