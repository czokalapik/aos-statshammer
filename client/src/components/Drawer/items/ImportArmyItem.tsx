import { ImportExport } from '@material-ui/icons';
import Uploader from 'components/Uploader';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUnitEnabledSelector } from 'store/selectors';
import { notificationsStore, unitsStore } from 'store/slices';

import MenuItem from '../MenuItem';

interface IImportArmyItemProps {
  onClick?: () => void;
  mini?: boolean;
}

const ImportArmyItem = ({ onClick, mini }: IImportArmyItemProps) => {
  const dispatch = useDispatch();
  const uploadEnabled = useSelector(addUnitEnabledSelector);

  /** The function to call when a file upload happens.
   * In this case that would be importing the uploaded unit data
   * @param {object} data the JSON from the uploaded unit
   * */
  const onArmyUpload = useCallback(
    (data) => {
      debugger;
      if (data && data.units) {
        dispatch(unitsStore.actions.clearAllUnits());
        data.units.forEach(unit => {
          if (unit.name && unit.weapon_profiles) {
            dispatch(
              notificationsStore.actions.addNotification({
                message: 'Successfully imported unit',
                variant: 'success',
              }),
            );
            dispatch(unitsStore.actions.addUnit({ unit }));
          }
        });
      }
      if (onClick) onClick();
    },
    [dispatch, onClick],
  );

  return (
    <Uploader
      onUpload={onArmyUpload}
      disabled={!uploadEnabled}
      component={
        <MenuItem disabled={!uploadEnabled} label="Import Army" icon={<ImportExport />} mini={mini} />
      }
    />
  );
};

export default ImportArmyItem;
