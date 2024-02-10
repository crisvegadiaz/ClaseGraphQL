import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PERSON } from "./persons/graphql-mutations";
import { ALL_PERSONS } from "./persons/graphql-queries";

export const PersonForm = ({notifyError}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError:(error)=>{
      notifyError(error.graphQLErrors[0].message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createPerson({ variables: { name, phone, city, street } });

    setStreet("");
    setPhone("");
    setName("");
    setCity("");
  };

  return (
    <div>
      <h2>Creacion new Person</h2>
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
        <input
          type="text"
          placeholder="Street"
          onChange={(evt) => setStreet(evt.target.value)}
          value={street}
        />
        <input
          type="text"
          placeholder="City"
          onChange={(evt) => setCity(evt.target.value)}
          value={city}
        />
        <button>Add Person</button>
      </form>
    </div>
  );
};
