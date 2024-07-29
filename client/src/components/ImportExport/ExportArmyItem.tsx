import { Button } from '@material-ui/core';
import { ImportExport } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSanitizedUnitsSelector, ISanitizedUnit } from 'store/selectors';
import { notificationsStore } from 'store/slices';

const downloadArmy = (army: ISanitizedUnit[], filename: string) => {
  const data = encodeURIComponent(JSON.stringify({ units: army }));
  // eslint-disable-next-line no-undef
  const a = document.createElement('a');
  a.href = `data:text/json;charset=utf-8,${data}`;
  a.download = `${filename}.json`;
  a.click();
};

interface IExportArmyItemProps {
  onClick?: () => void;
  filename: string;
}

const ExportArmyItem = ({ onClick, filename }: IExportArmyItemProps) => {
  const dispatch = useDispatch();
  const units = useSelector(getSanitizedUnitsSelector)(false);

  const exportArmy = () => {
    downloadArmy(units, filename);
    dispatch(notificationsStore.actions.addNotification({ message: 'Exported Army', variant: 'success' }));
    if (onClick) onClick();
  };

  return (
    <Button
      variant="contained"
      startIcon={<ImportExport />}
      color="primary"
      component="span"
      onClick={exportArmy}
    >
      Export units to a file
    </Button>
  );
};

export default ExportArmyItem;
