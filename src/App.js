import * as React from 'react';
import { styled } from '@mui/material/styles';
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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MenuIcon from '@mui/icons-material/Menu';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CardContent } from '@mui/material';
import { useState } from 'react'
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from '@mui/lab/DatePicker';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import DoNotDisturbAltRoundedIcon from '@mui/icons-material/DoNotDisturbAltRounded';
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
  const [taskArray, setTaskArray] = React.useState([]);
  const [openTask, setOpenTask] = React.useState(false);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [titleValidator, setTitleValidator] = React.useState('');
  const [descriptionValidator, setDescriptionValidator] = React.useState('');

  //toastrs
  const deleteSuccess = () => toast.success('Task successfully deleted');
  const addSuccess = () => toast.success('Task successfully added');
  const updateSuccess = () => toast.success('Task successfully updated');

  // changes the title of the dialog
  let changeTitle = (value) => {
    setTitle(value);
    validateTitle(value);
  };

  // returns whether or not the title is valid
  let validateTitle = (value) => {
    setError(false);
    let errors = [];
    // if title is empty, returns an error
    if (!value) {
      errors.push('Title is Required!');
      setError(true);
    }

    // loops through the entire task list to see if current title matches any of the other titles, which in turn would return an error
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i].title === value) {
        errors.push('Title is not unique!');
        setError(true);
      }
    }

    let anyErrors = errors.join();
    setTitleValidator(anyErrors);
    return anyErrors;
  };

  // sets updateOpen to true which opens up the dialog
  const handleUpdateClickOpen = () => {
    setUpdateOpen(true);
  };

  // sets updateOpen to false which closes the dialog
  const handleUpdateClickClosed = () => {
    setUpdateOpen(false);
  };

  const handleClickOpen = () => {
    setOpenTask(true);
  };

  const handleClickClosed = () => {
    setOpenTask(false);
  };

  // changes the value of the description
  let changeDescription = (value) => {
    setDescription(value);
    validateDescription(value);
  };

  // returns whether the description is valid
  let validateDescription = (value) => {
    setError(false);
    let errors = [];
    // if the description is empty, returns an error
    if (!value) {
      errors.push('Description is Required!');
      setError(true);
    }
    let anyErrors = errors.join();
    setDescriptionValidator(anyErrors);
    return anyErrors;
  };

  // changes the value of the deadline
  function changeDeadline(value) {
    setDeadline(value);
  }


  // creates a row with the required data to add to the table 
  function createData() {
    let data = {
      title,
      description,
      deadline,
      priority,
      isComplete: false,
      index,
    };

    taskArray.push(data);

    setIndex(taskArray.length);
    reset();
    addSuccess();
  }

  // adds a task row with all the required components into the table
  let add = () => {
    // if there are any validation errors for title and description, returns a toastr and appropriate errors
    if (validateTitle(title) || validateDescription(description)) {
      return;
    }

    createData();   //inserts the data into the table
    //closes the dialog
    handleClickClosed();
    handleUpdateClickClosed();
  };


  // sets the changed values into the selected task row
  function changeData() {
    let data = {
      title,
      description,
      deadline,
      priority,
      isComplete: false,
      index,
    };

    taskArray[index] = data;

    setIndex(taskArray.length);
    reset();
    updateSuccess();
  }

  let editSubmit = () => {
    // if there are validation errors for description value, returns a error toastr 
    if (validateDescription(description)) {
      return;
    }
    changeData();
    //closes the dialog
    handleClickClosed();
    handleUpdateClickClosed();
  };

  // the current description and deadline shows up before any editing is done
  function updateTasks(index) {
    let daData = taskArray[index];
    setDescription(daData.description);
    setTitle(daData.title);
    setPriority(daData.priority);
    setDeadline(daData.deadline);
    setIndex(daData.index);
  }

  function reset() {
    // resets everything back to origin whenever the dialog is cancelled
    setError(false);
    setTitle('');
    setTitleValidator('');
    setDescription('');
    setDescriptionValidator('');
    setPriority('');
    setDeadline('');
  }

  let changeCheckbox = (index) => {
    setTaskArray((array) => {
      let newTaskArray = [...array];
      newTaskArray[index].isComplete =
        !array[index].isComplete;
      return newTaskArray;
    });
  };

  const deleteEntry = (index) => {
    let newArrs = [...taskArray];
    newArrs.splice(index, 1);
    setTaskArray(newArrs);
    deleteSuccess();
  };

  return (
    <>
      <Dialog open={openTask || updateOpen} onClose={handleClickClosed || handleUpdateClickClosed}>
        <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'white' }}>
          {openTask ? 'Add Task' : 'Edit Task'}
        </DialogTitle>
        <br />
        <DialogContent>
          {openTask ? (
            <TextField
              error={error}
              sx={{ width: 1 }}
              id="titleinput"
              label="Title"
              placeholder="Type title..."
              helperText={titleValidator}
              value={title}
              onChange={(e) => changeTitle(e.target.value)}
            />
          ) : null}
          {openTask ? <br></br> : null}
          {openTask ? <br></br> : null}
          <TextField
            error={error}
            sx={{ width: 1 }}
            id="descriptioninput"
            label="Description"
            placeholder="Type description..."
            helperText={descriptionValidator}
            value={description}
            onChange={(e) => changeDescription(e.target.value)}
            InputLabelProps={updateOpen ? { shrink: true } : null}
          />
          <br />
          <br />
          <TextField
            type="date"
            defaultValue="01/01/2022"
            id="dateInput"
            value={deadline}
            onChange={(e) => changeDeadline(e.target.value)}
            label="Deadline"
            style={{ display: 'block' }}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <br />
          <br />
          Priority
          <br />
          <RadioGroup
            row
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <FormControlLabel value="low" control={<Radio />} label="Low" />
            <FormControlLabel value="med" control={<Radio />} label="Medium" />
            <FormControlLabel value="high" control={<Radio />} label="High" />
          </RadioGroup>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Deadline"
              value={deadline}
              onChange={(e) => {
                //updateDate(e);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>

        <DialogActions sx={{ bgcolor: 'white' }}>
          <Button
            onClick={() => { openTask ? add() : editSubmit() }}
            variant="contained"
            sx={{ width: 100 }}
            autoFocus
          >
            {openTask ? <AddCircleIcon /> : <EditIcon />}
            {openTask ? 'Add' : 'Edit'}
          </Button>

          <Button
            onClick={() => {
              handleClickClosed();
              handleUpdateClickClosed();
              reset();
            }}
            variant="contained"
            sx={{ bgcolor: 'red', width: 100 }}
            autoFocus
          >
            <DoNotDisturbAltRoundedIcon fontSize="small" />
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
      <Card sx={{ margin: '0%' }}>
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
                    handleClickOpen();
                  }}
                  sx={{ width: 100, marginRight: '15px' }}
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
                  {taskArray.map((data) =>
                    <TableRow key={data.index}>
                      <TableCell align="center">{data.title}</TableCell>
                      <TableCell align="center">{data.description}</TableCell>
                      <TableCell align="center">{moment(data.deadline).format('MM/DD/YY')}</TableCell>
                      <TableCell align="center">{data.priority}</TableCell>
                      <TableCell align="center">
                        <div>
                          {/* checkbox */}
                          {data.isComplete ? (
                            <div>
                              <Checkbox
                                defaultChecked
                                onClick={() => changeCheckbox(data.index)}
                              />
                            </div>
                          ) : (
                            <div>
                              <Checkbox
                                onClick={() => changeCheckbox(data.index)}
                              />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div>
                          {/*update button*/}
                          {!data.isComplete ? (
                            <div>
                              <Button
                                variant="contained"
                                sx={{ width: 100 }}
                                id="update"
                                onClick={() => {
                                  updateTasks(data.index);
                                  handleUpdateClickOpen();
                                }}
                              >
                                <EditIcon />
                                &nbsp;Update
                              </Button>
                            </div>
                          ) : null}
                          {/*delete button*/}
                          <div>
                            <Button
                              color="error"
                              variant="contained"
                              onClick={() => {
                                deleteEntry(data.index);
                              }}
                              sx={{ bgcolor: '#f44336', width: 100 }}
                            >
                              <HighlightOffIcon fontSize="small" />
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
