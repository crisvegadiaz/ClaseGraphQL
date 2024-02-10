import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_NUMBER } from "./persons/graphql-mutations";

export const PhoneForm = ({ notifyError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changeNumber, result] = useMutation(EDIT_NUMBER);
  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      console.error("Person not found");
      notifyError("Person not found");
    }
  }, [result.data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    changeNumber({ variables: { name, phone } });

    setPhone("");
    setName("");
  };

  return (
    <div>
      <h2>Creacion new Phone</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="text"
          placeholder="Name"
          onChange={(evt) => setName(evt.target.value)}
          value={name}
        />
        <input
          type="text"
          placeholder="Phone"
          onChange={(evt) => setPhone(evt.target.value)}
          value={phone}
        />
        <button>Change Phonen</button>
      </form>
    </div>
  );
};
