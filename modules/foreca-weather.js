//103451190 rj
const getRegionCode = (region) => {
  if (region === "1") {
    return "103451190";
  } else if (region === "2") {
    //mudar esse cara
    return "103451190";
  } else {
    return "103451190";
  }
};

export const requestForecast = async (region) => {
  const regionCode = getRegionCode(region);
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
  const response = await fetch(url, options);
  const result = await response.json();
  const data = result.forecast[0];
  console.log(data);
  return data;
};
