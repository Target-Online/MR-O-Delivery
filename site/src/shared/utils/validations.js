import { toast } from "react-toastify";

export const fields = (obj, fields) => {
  let result = true;

  fields.map((field) => {
    if (!obj[field] || obj[field] == "") {
      toast.error("Enter " + field);
      result = false;
      fields.length = 0;
    }
  });

  return result;
};
