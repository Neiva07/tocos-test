import React from 'react';
import './App.css'
import { Grid, TextField, Button, Autocomplete, Typography } from '@mui/material'
import { executeTransaction, getTransactions, getUsers, Transaction, User } from './apis';
import { toast } from 'react-toastify';

export function Transactions() {

  const [sender, setSender] = React.useState<User | null>(null);
  const [receiver, setReceiver] = React.useState<User | null>(null);
  const [amount, setAmount] = React.useState<number>();


  const [transactions, setTransactions] = React.useState<Array<Transaction>>([]);
  const [users, setUsers] = React.useState<Array<User>>([]);

  const handleTransaction = async () => {
    try {
      await executeTransaction(
        {
          senderId: sender?.id || '',
          receiverId: receiver?.id || '',
          amount: amount || 0
        }
      );
      fetchTransactions();
      toast.success("Sucessfully executed transaction")
    } catch (e) {
      console.error(e);
      toast.error('Failed to execute transaction')
    }
  }

  const fetchTransactions = () => {
    getTransactions().then(setTransactions);
  }

  const fetchUsers = () => {
    getUsers().then(setUsers);
  }

  React.useEffect(fetchTransactions, [])
  React.useEffect(fetchUsers, [])

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Autocomplete
            options={users}
            fullWidth
            value={sender}
            isOptionEqualToValue={(o1, o2) => o1.id === o2.id}
            getOptionLabel={o => o.name}
            onChange={(_, v) => setSender(v)}
            renderOption={(props, item) => (<li {...props} key={item.id}> {item.name} </li>)}
            renderInput={(params) => {
              return <TextField
                {...params}
                label="Sender"
              />
            }}
          />

        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={users}
            fullWidth
            value={receiver}
            isOptionEqualToValue={(o1, o2) => o1.id === o2.id}
            getOptionLabel={o => o.name}
            onChange={(_, v) => setReceiver(v)}
            renderOption={(props, item) => (<li {...props} key={item.id}> {item.name} </li>)}
            renderInput={(params) => {
              return <TextField
                {...params}
                label="Receiver"
              />
            }}
          />

        </Grid>
        <Grid item xs={4}>
          <TextField
            value={amount}
            type="number"
            onChange={e => setAmount(Number(e.target.value))}
            fullWidth
            label="Amount"
            onFocus={e => e.target.select()}
          />
        </Grid>
        <Button variant="outlined" style={{ margin: '20px 20px' }} onClick={handleTransaction}> Execute Transaction</Button>
      </Grid >

      <Typography variant='h5'>Transaction List</Typography>


      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <ol>
            <>
              {
                transactions.map(t => {
                  return <li key={t.id}> Sender name:<b>{t.sender.name}</b> - Receiver name:<b>{t.receiver.name}</b> - Transaction Amount:{t.amount} </li>
                })
              }
            </>
          </ol>
        </Grid>
      </Grid>
    </div>
  );
}

