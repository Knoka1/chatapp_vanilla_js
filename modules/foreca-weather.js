//103451190 rj
const regionCode = 103451190;
const chooseRegion = (region) => {
  if (region === "Rio de Janeiro") {
    regionCode = 103451190;
  } else if (region === "São Paulo") {
    regionCode = 103451330;
  }
};
const url = `https://foreca-weather.p.rapidapi.com/forecast/daily/${regionCode}?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full`;
const options = {
  method: "GET",
  //We are using a hardcapped exposed api-key for simplicity.
  headers: {
    "content-type": "application/octet-stream",
    "X-RapidAPI-Key": "4477875a78msh73db8c6f31c4a61p188f62jsne2b47f05859f",
    "X-RapidAPI-Host": "foreca-weather.p.rapidapi.com",
  },
};

export const requestForecast = async () => {
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getForecast = async () => {
  requestForecast();
};
