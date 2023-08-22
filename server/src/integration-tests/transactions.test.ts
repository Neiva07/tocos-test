import axios from "axios"
import { ObjectId } from "mongodb";

const createUserBody = JSON.stringify({
  'email': 'email@myemail.com',
  'name': 'myname',
  'tocos': 20,
});


describe('Executing transaction', () => {

  it('successfully executed transaction when users exist and sender has balance', async () => {

    const options = {
      method: 'POST',
      url: 'http://app:8080/api/v1/users',
      headers: {
        'Content-Type': 'application/json',
      },
      data: createUserBody,
    };


    const senderResponse = await axios.request(options)
    const { user: sender } = senderResponse.data;
    const receiverResponse = await axios.request(options)
    const { user: receiver } = receiverResponse.data;

    const transactionOptions = {
      method: 'POST',
      url: 'http://app:8080/api/v1/transactions',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        'senderId': sender.id,
        'receiverId': receiver.id,
        'amount': 10,
      }),
    };

    const res = await axios.request(transactionOptions)

    const transaction = res.data;

    expect(res.status).toBe(200);
    expect(transaction.sender.id).toBe(sender.id)
    expect(transaction.receiver.id).toBe(receiver.id)
    expect(transaction.receiver.tocos).toBe(receiver.tocos + 10);
    expect(transaction.sender.tocos).toBe(sender.tocos - 10);

    expect(transaction.id).toBeDefined();
  });


  it('transaction fails with 422 when amount is greater than sender balance', async () => {

    const options = {
      method: 'POST',
      url: 'http://app:8080/api/v1/users',
      headers: {
        'Content-Type': 'application/json',
      },
      data: createUserBody,
    };


    const senderResponse = await axios.request(options)
    const { user: sender } = senderResponse.data;
    const receiverResponse = await axios.request(options)
    const { user: receiver } = receiverResponse.data;

    const transactionOptions = {
      method: 'POST',
      url: 'http://app:8080/api/v1/transactions',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        'senderId': sender.id,
        'receiverId': receiver.id,
        'amount': 30,
      }),
    };

    try {
      const res = await axios.request(transactionOptions)

      expect(res.status).not.toBe(200);

    } catch (e) {
      if (e instanceof axios.AxiosError) {
        expect(e.response?.status).toBe(422);
      }
    }
  });

  it('transaction fails with 404 when user does not exist', async () => {

    const options = {
      method: 'POST',
      url: 'http://app:8080/api/v1/users',
      headers: {
        'Content-Type': 'application/json',
      },
      data: createUserBody,
    };


    const senderResponse = await axios.request(options)
    const { user: sender } = senderResponse.data;

    const transactionOptions = {
      method: 'POST',
      url: 'http://app:8080/api/v1/transactions',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        'senderId': sender.id,
        'receiverId': new ObjectId().toJSON(),
        'amount': 10,
      }),
    };

    try {
      const res = await axios.request(transactionOptions)

      expect(res.status).not.toBe(200);

    } catch (e) {
      if (e instanceof axios.AxiosError) {
        expect(e.response?.status).toBe(404);
      }
    }
  });




});

