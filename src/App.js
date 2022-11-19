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

//js libraries
import moment from 'moment';
import toastr from 'toastr';





function App() {
  let [title, setTitle] = React.useState('');
  let [description, setDescription] = React.useState('');
  let [deadline, setDeadline] = React.useState('');
  let [priority, setPriority] = React.useState('');
  let [isComplete, setIsComplete] = React.useState(false);
  let [index, setIndex] = React.useState(0);
  let [taskArray, setTaskArray] = React.useState([]);
  let [adding, setAdding] = React.useState(false);
  let [openTask, setOpenTask] = React.useState(false);
  let [updateOpen, setUpdateOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  let [titleValidator, setTitleValidator] = React.useState('');
  let [descriptionValidator, setDescriptionValidator] = React.useState('');

  let changeTitle = (value) => {
    setTitle(value);
    validateTitle(value);
  };

  let validateTitle = (value) => {
    setError(false);
    let errors = [];
    if (!value) {
      errors.push('Title is Required!');
      setError(true);
    }
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i].title === value) {
        errors.push('Title is not unique!');
        setError(true);
      }
    }
    let results = errors.join();
    setTitleValidator(results);
    return results;
  };

  const handleUpdateClickOpen = () => {
    setUpdateOpen(true);
  };
  const handleUpdateClickClosed = () => {
    setUpdateOpen(false);
  };

  let changeDescription = (value) => {
    setDescription(value);
    validateDescription(value);
  };

  let validateDescription = (value) => {
    setError(false);
    let errors = [];
    if (!value) {
      errors.push('Description is Required!');
      setError(true);
    }
    let results = errors.join();
    setDescriptionValidator(results);
    return results;
  };

  function changeDeadline(value) {
    setDeadline(value);
  }

  let submit = () => {
    if (validateTitle(title) || validateDescription(description)) {
      toastr.error(`Could not submit form!`, ``, {
        positionClass: 'toast-bottom-right',
      });
      return;
    }
    createData();
    handleClickClosed();
    handleUpdateClickClosed();
    //thingie();
  };

  let updateSubmit = () => {
    if (validateDescription(description)) {
      toastr.error(`Could not submit form!`, ``, {
        positionClass: 'toast-bottom-right',
      });
      return;
    }
    createData();
    handleClickClosed();
    handleUpdateClickClosed();
  };

  //update a task
  function updateTasks(index) {
    let desiredTaskArrayId = -1;
    for (let i = 0; i < taskArray.length && desiredTaskArrayId === -1; i++) {
      if (taskArray[i].index === index) {
        // taskArray[i] is the task that you want to update isComplete
        desiredTaskArrayId = i;
      }
    }
    index = desiredTaskArrayId;
    let daData = taskArray[index];
    //console.log(data);
    //taskArray.push(data);
    //setIndex(data.index);
    setAdding(false);
    setDescription(daData.description);
    setTitle(daData.title);
    setPriority(daData.priority);
    setDeadline(daData.deadline);
    setIndex(daData.index);

    toastr.success(`Task updated successfully!`, ``, {
      positionClass: 'toast-bottom-right',
    });
  }

  const handleClickOpen = () => {
    setOpenTask(true);
  };

  const handleClickClosed = () => {
    setOpenTask(false);
  };

  function createData() {
    let data = {
      title,
      description,
      deadline,
      priority,
      isComplete: false,
      index,
    };

    if (adding) {
      taskArray.push(data);
    } else {
      taskArray[index] = data;
    }

    setIndex(taskArray.length);
    setDescription('');
    setTitle('');
    setPriority('');
    setDeadline('');
    toastr.success(`Task added successfully!`, ``, {
      positionClass: 'toast-bottom-right',
    });
  }

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
              display
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
            onClick={() => { openTask ? submit() : updateSubmit() }}
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
                        {/*update button*/}
                        {data.isComplete ? (
                          <div>
                            <Checkbox
                              defaultChecked
                            />
                          </div>
                        ) : (
                          <div>
                            <Checkbox
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
                              <i className="fa fa-fw fa-edit"></i>
                              &nbsp;Update
                            </Button>
                          </div>
                        ) : (
                          <></>
                        )}
                        {/*delete button*/}
                        <div>
                          <Button
                            color="error"
                            variant="contained"
                            sx={{ bgcolor: '#f44336', width: 100 }}
                          >
                            <i className="fa fa-fw fa-times-circle"></i>
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
      </Card>
    </>
  );
}

export default App;
