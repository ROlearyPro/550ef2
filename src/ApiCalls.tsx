
const apiURL = process.env.REACT_APP_BACKEND_API_URL
const backendURL = `${apiURL}`

/*-----------------------------------// GET //--------------------------------------*/


export const getBlueprints = async () => {
  try {
    const response = await fetch(`${backendURL}api/v1/${process.env.TENANT_ID}/actions/blueprints/${process.env.ACTION_BLUEPRINT_ID}/graph`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const err = new Error(response.statusText);
      throw err;
    }
    console.log(response.json())
    return await response.json();
  } catch (err) {
    console.error('error in retrieving blueprint data: ', err);
    throw err;
  }
};


