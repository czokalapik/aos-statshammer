import { Button } from '@material-ui/core';
import { ImportExport } from '@material-ui/icons';
import Uploader from 'components/Uploader';
import React from 'react';
import { useDispatch } from 'react-redux';
import { notificationsStore } from 'store/slices';
import { IUnit } from 'types/unit';

interface IImportArmyProps {
  onArmyLoad: (units: IUnit[]) => void;
}

const ImportArmyItem = ({ onArmyLoad }: IImportArmyProps) => {
  const dispatch = useDispatch();

  /** The function to call when a file upload happens.
   * In this case that would be importing the uploaded unit data
   * @param {object} data the JSON from the uploaded unit
   * */
  const onArmyUpload = (data) => {
    if (data && data.units) {
      onArmyLoad(data.units);
    } else if (data && data.name && data.weapon_profiles) {
      const singleUnit: IUnit = data;
      onArmyLoad([singleUnit]);
    } else {
      dispatch(
        notificationsStore.actions.addNotification({
          message: 'No units to import from this file!',
          variant: 'error',
        }),
      );
    }
  };

  return (
    <Uploader
      onUpload={onArmyUpload}
      component={
        <Button variant="contained" startIcon={<ImportExport />} color="primary" component="span">
          Import units from a file
        </Button>
      }
    />
  );
};

export default ImportArmyItem;
