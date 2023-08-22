import axios from "axios"

const createUserBody = JSON.stringify({
  'email': 'email@myemail.com',
  'name': 'myname',
  'tocos': 20,
});


describe('Creating users test', () => {

  it('successfully create user when payload is correct', async () => {

    const options = {
      method: 'POST',
      url: 'http://app:8080/api/v1/users',
      headers: {
        'Content-Type': 'application/json',
      },
      data: createUserBody,
    };


    const res = await axios.request(options)
    const { user } = res.data;

    expect(user).toBeDefined()
    expect(res.status).toBe(200);

    expect(user.name).toBe('myname')
    expect(user.tocos).toBe(20)
    expect(user.email).toBe('email@myemail.com')
    expect(user.id).not.toBeNull()
  });

  it('fails to create user when payload does not provide correct format', async () => {

    const options = {
      method: 'POST',
      url: 'http://app:8080/api/v1/users',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        emaaaail: 'email@theemail.com',
        name: 'myname',
        tocos: 40,
      })
    }

    try {
      await axios.request(options)
    } catch (e) {
      if (e instanceof axios.AxiosError) {
        expect(e.response?.status).toBe(422);
      }
    }
  })

});


describe('Get users test', () => {

  it('successfully retrieve users when the data is there', async () => {
    const postOptions = {
      method: 'POST',
      url: 'http://app:8080/api/v1/users',
      headers: {
        'Content-Type': 'application/json',
      },
      data: createUserBody,
    };

    const res = await axios.request(postOptions)
    const { user: { id } } = res.data;
    const getOptions = {
      method: 'GET',
      url: `http://app:8080/api/v1/users/${id}`
    }

    const getResponse = await axios.request(getOptions);

    const { user } = getResponse.data;


    expect(user).toBeDefined()
    expect(res.status).toBe(200);
    expect(user.name).toBe('myname')
    expect(user.tocos).toBe(20)
    expect(user.email).toBe('email@myemail.com')
    expect(user.id).toBe(id)

  })
})
