import axios from "axios";

const getTeams = async () => {
  let teams;

  await axios
    .get("/api/team")
    .then((response) => {
      teams = response.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return teams;
};

export { getTeams };
