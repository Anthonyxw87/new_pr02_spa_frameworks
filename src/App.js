// Anthony Wang CSDS 221 pr02: Frameworks

import React from 'react';
import Table from '@mui/material/Table';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CardContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import DoNotDisturbAltRoundedIcon from '@mui/icons-material/DoNotDisturbAltRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//js libraries
import moment from 'moment';


function App() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [deadline, setDeadline] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [index, setIndex] = React.useState(0);
  const [arrayEntries, setArrayEntries] = React.useState([]);
  const [openTask, setOpenTask] = React.useState(false);
  const [storedIndex, setStoredIndex] = React.useState(-1);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [titleValidator, setTitleValidator] = React.useState('');
  const [descriptionValidator, setDescriptionValidator] = React.useState('');

  //toastrs
  const addingSuccess = () => toast.success('Task successfully added');
  const updatingSuccess = () => toast.success('Task successfully updated');
  const deletingSuccess = () => toast.success('Task successfully deleted');

  // sets openTask to true which opens up the dialog
  const handleClickOpen = () => {
    setOpenTask(true);
  };

  // sets openTask to false which closes the dialog
  const handleClickClosed = () => {
    setOpenTask(false);
  };

  // sets updateOpen to true which opens up the dialog
  const handleUpdateClickOpen = () => {
    setUpdateOpen(true);
  };

  // sets updateOpen to false which closes the dialog
  const handleUpdateClickClosed = () => {
    setUpdateOpen(false);
  };

  //Attributes of each entry
  const [entry, setEntry] = React.useState({
    title: '',
    description: '',
    deadline: '',
    priority: '',
    complete: false,
  });

  // changes the title of the dialog
  let changeTitle = (value) => {
    setEntry({ ...entry, title: value.target.value });
  };

  // returns whether or not the title is valid
  let validateTitle = (value) => {
    setError(false);
    let errors = [];

    // First test: check for empty title
    if (!value) {
      errors.push('Title is Required!');
      setError(true);
    }

    // Second Test: check for duplicate titles
    for (let i = 0; i < arrayEntries.length; i++) {
      if (arrayEntries[i].title === value) {
        errors.push('Title is not unique!');
        setError(true);
      }
    }

    let anyErrors = errors.join();
    setTitleValidator(anyErrors);
    return anyErrors;
  };

  // changes the value of the description
  let changeDescription = (value) => {
    setEntry({ ...entry, description: value.target.value });
  };

  // returns whether the description is valid
  let validateDescription = (value) => {
    setError(false);
    let errors = [];
    // checks for empty description 
    if (!value) {
      errors.push('Description is Required!');
      setError(true);
    }
    let anyErrors = errors.join();
    setDescriptionValidator(anyErrors);
    return anyErrors;
  };

  // resets everything back to default whenever the dialog is cancelled
  const reset = () => {
    setEntry({
      title: '',
      description: '',
      deadline: '',
      priority: '',
    });
    setError(false);
    setDescriptionValidator('');
    setTitleValidator('');
  };

  // creates a entry with the required data to add to the table 
  let createEntry = () => {
    setArrayEntries((arrayEntries) => [...arrayEntries, entry]);
    reset(); // resets the values of the entries for the next dialog use
    addingSuccess(); // toaster pop up indicating a successful addition to the table
  }

  // adds a entry with all the required components into the table
  let add = () => {
    // if there are any validation errors for title and description, returns appropriate errors
    if (validateTitle(entry.title) || validateDescription(entry.description)) {
      return;
    }

    createEntry();   //inserts the entry into the table
    //closes the dialog
    handleClickClosed();
    handleUpdateClickClosed();
  };


  // sets the changed values into the selected task row
  const changeEntry = () => {
    let index = storedIndex;
    let newEntry = [...arrayEntries];
    let currentEntry = newEntry[index];
    newEntry[index] = {
      title: currentEntry.title,
      description: entry.description,
      deadline: entry.deadline,
      priority: entry.priority,
      complete: currentEntry.complete,
    };

    setArrayEntries(newEntry);
    reset();
    updatingSuccess();
  }

  // this allows the already inputed values to be displayed in the edit task dialog
  let updateValues = (index) => {
    setStoredIndex(index);
    let currentEntry = arrayEntries[index];
    setEntry({
      title: currentEntry.title,
      description: currentEntry.description,
      deadline: currentEntry.deadline,
      priority: currentEntry.priority,
    });

  }

  // edits an entry in the table
  let editSubmit = () => {
    // if there are validation errors for description value, returns a error toastr 
    if (validateDescription(entry.description)) {
      return;
    }
    changeEntry();
    //closes the dialog
    handleClickClosed();
    handleUpdateClickClosed();
  };


  // makes the checkbox checked or unchecked and sets the value of complete to true
  const toggleCheckbox = (index) => (e) => {
    let newEntry = [...arrayEntries];
    let currentEntry = newEntry[index];
    let completes = currentEntry.complete;
    newEntry[index] = {
      title: currentEntry.title,
      description: currentEntry.description,
      deadline: currentEntry.deadline,
      priority: currentEntry.priority,
      complete: !completes,
    };
    setArrayEntries(newEntry);
  };

  // deletes the entry
  const deleteEntry = (index) => {
    let newEntry = [...arrayEntries];
    newEntry.splice(index, 1);
    setArrayEntries(newEntry);
    deletingSuccess();
  };

  return (
    <>
      <Dialog open={openTask || updateOpen} onClose={handleClickClosed || handleUpdateClickClosed}>
        {/* Title of dialog */}
        <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'white' }}>
          {openTask ? 'Add Task' : 'Edit Task'}
        </DialogTitle>
        <br />
        <DialogContent>
          {/* Title (only displays when its the add dialog) */}
          {openTask && (
            <TextField
              error={error}
              sx={{ width: 1 }}
              id="titleinput"
              label="Title"
              placeholder="Type title..."
              helperText={titleValidator}
              value={entry.title}
              onChange={(e) => changeTitle(e)}
            />
          )}
          {openTask && <br></br>}
          {openTask && <br></br>}

          {/* Description */}
          <TextField
            error={error}
            sx={{ width: 1 }}
            id="descriptioninput"
            label="Description"
            placeholder="Type description..."
            helperText={descriptionValidator}
            value={entry.description}
            onChange={(e) => changeDescription(e)}
            InputLabelProps={updateOpen && { shrink: true }}
          />
          <br />
          <br />

          {/*Date Picker */}
          <TextField
            type="date"
            defaultValue="01/01/2022"
            id="dateInput"
            value={entry.deadline}
            onChange={(e) => setEntry({ ...entry, deadline: e.target.value })}
            label="Deadline"
            style={{ display: 'block' }}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <br />

          {/* Priority */}
          <br />
          Priority
          <br />
          <RadioGroup
            row
            value={entry.priority}
            onChange={(e) => setEntry({ ...entry, priority: e.target.value })}
          >
            <FormControlLabel value="low" control={<Radio />} label="Low" />
            <FormControlLabel value="med" control={<Radio />} label="Medium" />
            <FormControlLabel value="high" control={<Radio />} label="High" />
          </RadioGroup>
        </DialogContent>

        <DialogActions sx={{ bgcolor: 'white' }}>
          <Button
            onClick={() => { openTask ? add() : editSubmit() }}   // onClick depends on which dialog is being used
            variant="contained"
            sx={{ width: '35%' }}
            autoFocus
          >
            {openTask ? <AddCircleIcon fontSize='small' /> : <EditIcon fontSize='small' />} 
            {openTask ? 'Add' : 'Edit'}
          </Button>

          <Button
            onClick={() => {
              // closes the dialog 
              handleClickClosed(); 
              handleUpdateClickClosed();  
              reset();  // resets values of dialog to blank when cancelled
            }}
            variant="contained"
            sx={{ bgcolor: 'red', width: '35%' }}
            autoFocus
          >
            <DoNotDisturbAltRoundedIcon fontSize="small" />
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
      <Card sx={{ margin: '0.5%' }}>
        <div>
          <CardHeader
            sx={{ bgcolor: 'primary.dark', color: 'white' }}
            title={
              <>
                <MenuIcon />
                FRAMEWORKS
              </>
            }
            style={{ textAlign: 'center' }}
            action={
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleClickOpen(); // opens up the dialog when clicked
                  }}
                  sx={{ marginRight: '20px' }}
                >
                  <AddCircleIcon />
                  &nbsp; ADD
                </Button>
              </>
            }
          ></CardHeader>
          <CardContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ color: 'gray' }}>
                      Title
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'gray' }}>
                      Description
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'gray' }}>
                      Deadline
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'gray' }}>
                      Priority
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'gray' }}>
                      Is Complete
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'gray' }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {''}
                  {arrayEntries.map((entry, index) =>
                    <TableRow key={entry.title}>
                      <TableCell align="center">{entry.title}</TableCell>
                      <TableCell align="center">{entry.description}</TableCell>
                      <TableCell align="center">{moment(entry.deadline).format('MM/DD/YY')}</TableCell>
                      <TableCell align="center">{entry.priority}</TableCell>
                      <TableCell align="center">
                        <Checkbox onChange={toggleCheckbox(index)} />
                      </TableCell>
                      <TableCell align="center">
                        <div>
                          {/* update button */}
                          {!entry.complete && (
                            <div>
                              <Button
                                variant="contained"
                                sx={{ width: '50%' }}
                                id="update"
                                onClick={() => {
                                  updateValues(index);
                                  handleUpdateClickOpen();
                                }}
                              >
                                <EditIcon />
                                &nbsp;Update
                              </Button>
                            </div>
                          )}
                          {/* delete button */}
                          <div>
                            <Button
                              color="error"
                              variant="contained"
                              onClick={() => {
                                deleteEntry(index);
                              }}
                              sx={{ bgcolor: '#f44336', width: '50%' }}
                            >
                              <CancelIcon font="small" />
                              &nbsp;Delete
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>

          {/*TOASTER CONTAINER SO TOASTS CAN DISPLAY */}
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Card>
    </>
  );
}

export default App;
