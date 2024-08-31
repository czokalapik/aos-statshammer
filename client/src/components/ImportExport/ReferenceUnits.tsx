import { Button } from '@material-ui/core';
import { ImportExport } from '@material-ui/icons';
import REFERENCE_UNITS from 'armies/reference/reference';
import React from 'react';
import { IArmy } from 'types/army';

interface IReferenceUnitsProps {
  onLoadReferenceUnits: (referenceUnits: IArmy) => void;
}

const ReferenceUnits = ({ onLoadReferenceUnits }: IReferenceUnitsProps) => {
  const onClick = () => onLoadReferenceUnits(REFERENCE_UNITS);

  return (
    <Button
      variant="contained"
      startIcon={<ImportExport />}
      color="primary"
      component="span"
      onClick={onClick}
    >
      Import reference units
    </Button>
  );
};

export default ReferenceUnits;
