import axios from "axios";
import { toast } from "sonner";

const userHasSubmission = async () => {
  let hasSubmission = false;

  await axios
    .get(`/api/submission`)
    .then((response) => {
      if (response.data.length > 0) {
        hasSubmission = true;
      }
    })
    .catch((error) => {
      toast.error(
        `Erro ao buscar inscrição: ${error.response.data.message} ${error.response.status}`
      );
    });

  return hasSubmission;
};

export { userHasSubmission };