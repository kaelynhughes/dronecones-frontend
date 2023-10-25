import axios from "axios";
import { CATFACT_URL } from "../constants";

export default () => {
  const catFact: Promise<String> = axios
    .get(`${CATFACT_URL}`)
    .then((response) => {
      return response.data.fact;
    });
  return catFact;
};
