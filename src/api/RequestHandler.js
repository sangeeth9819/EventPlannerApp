// Post API
export let POST = (api, postDetail, BearerToken) =>
  new Promise(async (resolve, reject) => {
    await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postDetail),
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log("ERROR ", error);
        resolve(false);
      });
  });

// Post API
export let POST_DATA = (api, postDetail, BearerToken) =>
  new Promise(async (resolve, reject) => {
    await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + BearerToken,
      },
      body: JSON.stringify(postDetail),
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log("ERROR ", error);
        resolve(false);
      });
  });

// Post FormData
export let POST_FORMDATA = (api, formData, BearerToken) =>
  new Promise(async (resolve, reject) => {
    await fetch(api, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + BearerToken,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log("ERROR ", error);
        resolve(false);
      });
  });

// GET API
export let GET = (api, BearerToken) =>
  new Promise(async (resolve, reject) => {
    console.log(api)
    await fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        console.log(response)
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      });
  });

// PUT API
export let PUT = (api, BearerToken) =>
  new Promise(async (resolve, reject) => {
    await fetch(api, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + BearerToken,
      },
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      });
  });



// PUT API
export let PUT_DATA = (api,postDetail, BearerToken) =>
  new Promise(async (resolve, reject) => {
    await fetch(api, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + BearerToken,
      },
      body: JSON.stringify(postDetail),
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      });
  });

// DELETE API
export let DELETE = (api, postDetail, xAccessToken) =>
  new Promise(async (resolve, reject) => {
    await fetch(api, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': xAccessToken,
      },
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      });
  });
