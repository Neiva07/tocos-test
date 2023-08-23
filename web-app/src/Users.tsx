import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { createUser, getUsers, User } from "./apis";

export const Users = () => {

  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [tocos, setTocos] = React.useState<number>(0);


  const [users, setUsers] = React.useState<Array<User>>([]);

  const handleCreateUser = async () => {
    try {
      await createUser({ name, email, tocos });
      fetchUsers();
      toast.success("Sucessfully created user")
    } catch (e) {
      console.error(e);
      toast.error("Error creating user")
    }
  }

  const fetchUsers = () => {
    getUsers().then(setUsers);
  }

  React.useEffect(fetchUsers, [])
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            label="Name"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            label="Email"
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            value={tocos}
            onChange={e => setTocos(Number(e.target.value))}
            label="Tocos"
            onFocus={e => e.target.select()}
          />
        </Grid>

        <Button style={{ margin: '20px 20px' }} variant="outlined" onClick={handleCreateUser}> Create User </Button>
      </Grid >

      <Typography variant='h5'> User List</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ol>
            <>
              {
                users.map(u => {
                  return <li key={u.id}> <b>{u.name}</b> - <b>{u.email}</b> - {u.tocos} </li>
                })
              }
            </>
          </ol>
        </Grid>
      </Grid>
    </div>
  );
}

