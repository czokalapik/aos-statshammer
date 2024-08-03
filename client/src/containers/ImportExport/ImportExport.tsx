import {
  Card,
  CircularProgress,
  Divider,
  Paper,
  Switch,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MATCHPLAY from 'armies/matchplay/matchplay';
import SPEARHEADS from 'armies/spearheads/spearheads';
import ArmySelector from 'components/ImportExport/ArmySelector';
import ExportArmyItem from 'components/ImportExport/ExportArmyItem';
import ImportArmy from 'components/ImportExport/ImportArmy';
import { useReadFromFile } from 'hooks';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { configSelector } from 'store/selectors';
import { configStore, notificationsStore, unitsStore } from 'store/slices';
import { IArmy } from 'types/army';
import { IUnitParameter } from 'types/unit';
import { scrollToTop } from 'utils/scrollIntoView';
import { ROUTES } from 'utils/urls';

const useStyles = makeStyles((theme: Theme) => ({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: '1em',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '1em',
  },
  container: {
    margin: theme.spacing(3),
  },
  card: {
    padding: theme.spacing(2),
  },
  md: {
    margin: 'auto',
    marginTop: -theme.spacing(2),
    '& a': {
      color: theme.palette.primary.main,
      '&:visited': {
        color: theme.palette.primary.dark,
      },
    },
    '& p': {
      fontSize: '0.75rem',
    },
  },
  loader: {
    margin: theme.spacing(4),
  },
  topleftMargin: {
    marginTop: '1em',
    marginLeft: '1em',
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const ImportExport = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const content = useReadFromFile('contribute.md');
  const config = useSelector(configSelector);
  const compareString = (a, b) => 0 - (a < b ? 1 : -1);
  const compareArmy = (a, b) =>
    a.faction === b.faction ? compareString(a.label, b.label) : compareString(a.faction, b.faction);
  const compareUnit = (a, b) => compareString(a.name, b.name);
  const sortedSpearheads = SPEARHEADS.sort(compareArmy);
  const sortedMatchPlays = MATCHPLAY.sort(compareArmy);

  const goToHome = () => {
    history.push(ROUTES.HOME);
  };

  const loadUnitsWithStatus = (units: IUnitParameter[], forceStatus:boolean, unitActiveStatus: boolean) => {
    if (config.importReplace) {
      dispatch(unitsStore.actions.clearAllUnits());
    }
    units.sort(compareUnit).forEach((unit) => {
      if (unit.name && unit.weapon_profiles) {
        if (forceStatus){
          const unitToAdd = {...unit, active:unitActiveStatus};
          dispatch(unitsStore.actions.addUnit({ unit:unitToAdd }));
        } else {
          dispatch(unitsStore.actions.addUnit({ unit }));
        }
      }
    });
    dispatch(
      notificationsStore.actions.addNotification({
        message: 'Successfully imported units',
        variant: 'success',
      }),
    );
    goToHome();
  };
  const loadUnits = (units: IUnitParameter[]) => loadUnitsWithStatus(units, false, false);
  const loadActiveArmy = (army: IArmy) => loadUnitsWithStatus(army.units,true, true);
  const loadInactiveArmy = (army: IArmy) => loadUnitsWithStatus(army.units, true, false);

  const toggleReplace = () => {
    dispatch(configStore.actions.toggleImportReplace());
  };

  const FilenameError = () => {
    if (!config.exportFilename || config.exportFilename === '') return 'Required';
    return undefined;
  };

  const handleEditFilename = (event: any) => {
    dispatch(configStore.actions.updateExportFilename({ newName: event.target.value }));
  };

  useEffect(() => {
    scrollToTop(true);
  });

  return (
    <div className={classes.container}>
      <div className={classes.flexColumn}>
        <Card className={classes.card}>
          <Typography variant="h5">Export army</Typography>
          <Typography variant="caption">
            Export all your units in a file you will be able to import later on
          </Typography>
          <div className={classes.flexRow}>
            <TextField
              label="File name"
              value={config.exportFilename}
              onChange={handleEditFilename}
              error={Boolean(FilenameError())}
              helperText={FilenameError()}
            />
            <div className={classes.topleftMargin}>
              <ExportArmyItem filename={config.exportFilename} />
            </div>
          </div>
        </Card>
        <Divider className={classes.divider} />
        <Card className={classes.card}>
          <Typography variant="h5">Import army</Typography>
          <Typography variant="caption">
            You can import units from here. Either from a file you exported previously, either from a
            pre-built selection within the application.
          </Typography>
          <div>
            <Switch onChange={toggleReplace} checked={config.importReplace} />
            {`${config.importReplace ? 'Replace all units' : 'Add units to existing units'}`}
          </div>
          <div className={classes.flexRow}>
            <ImportArmy onArmyLoad={loadUnits} />
            <ArmySelector onClick={loadInactiveArmy} armies={sortedMatchPlays} label="Import Faction" />
            <ArmySelector onClick={loadActiveArmy} armies={sortedSpearheads} label="Import Spearhead" />
          </div>
          <Divider className={classes.divider} />
          <Paper>
            {!content && (
              <div className={classes.loader}>
                <CircularProgress size="6rem" />
              </div>
            )}
            <ReactMarkdown source={content} className={classes.md} />
          </Paper>
        </Card>
      </div>
    </div>
  );
};

export default ImportExport;
