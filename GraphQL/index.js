// Importación de ApolloServer para crear el servidor GraphQL, UserInputError para manejar errores de entrada y gql para definir esquemas GraphQL.
import { ApolloServer, UserInputError, gql } from "apollo-server";
// Importación de uuid para generar identificadores únicos.
import { v1 as uuid } from "uuid";
// Importación de fetch para realizar solicitudes HTTP.
import fetch from "node-fetch";

// Definición de una lista de personas.
const persons = [
  {
    name: "Midu",
    age: 23,
    phone: "034-1234567",
    street: "Calle Frontend",
    city: "Barcelona",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Youseff",
    age: 13,
    phone: "044-123456",
    street: "Avenida Fullstack",
    city: "Mataro",
    id: "3d599470-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Itzi",
    street: "Pasaje Testing",
    city: "Ibiza",
    id: "3d599471-3436-11e9-bc57-8b80ba54c431",
  },
];

// Definición de los tipos GraphQL utilizando gql.
const typeDefinitions = gql`
  enum YesNo {
    Yes
    No
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    age: Int
    phone: String
    address: Address!
    id: ID!
    check: String!
    canDrink: Boolean
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
  }
`;

// Definición de resolutores para resolver consultas y mutaciones.
const resolvers = {
  Query: {
    // Resuelve la consulta para obtener el número total de personas en la lista.
    personCount: () => persons.length,
    // Resuelve la consulta para obtener todas las personas.
    allPersons: () => persons,
    // Resuelve la consulta para obtener todas las personas desde una API REST (comentado).
    /* allPersons: async (_, args) => {
      try {
        const response = await fetch("http://localhost:3000/persons");
        const personsFromRestApi = await response.json();

        if (!args.phone) return personsFromRestApi;

        const byPhone = (person) =>
          args.phone === "Yes" ? person.phone : !person.phone;

        return personsFromRestApi.filter(byPhone);
      } catch (error) {
        console.error("Error al obtener personas:", error);
        throw new Error("Error al obtener personas");
      }
    },*/
    // Resuelve la consulta para encontrar una persona por su nombre (comentado).
    findPerson: (_, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },

  Mutation: {
    // Resuelve la mutación para agregar una nueva persona a la lista.
    addPerson: (_, args) => {
      // Verifica si el nombre de la persona ya existe en la lista.
      if (persons.find((p) => p.name === args.name)) {
        // Lanza un error de entrada si el nombre no es único.
        throw new UserInputError("Name must be unique", {
          invalidArgs: args.name,
        });
      }
      // Crea una nueva persona con un identificador único generado por uuid.
      const person = { ...args, id: uuid() };
      // Agrega la nueva persona a la lista.
      persons.push(person);
      // Retorna la nueva persona agregada.
      return person;
    },
    // Resuelve la mutación para editar el número de teléfono de una persona.
    editNumber: (root, args) => {
      // Busca la persona por su nombre en la lista.
      const personIndex = persons.findIndex((p) => p.name === args.name);
      // Retorna null si la persona no se encuentra en la lista.
      if (personIndex === -1) return null;

      // Obtiene la persona encontrada.
      const person = persons[personIndex];

      // Actualiza el número de teléfono de la persona.
      const updatedPerson = { ...person, phone: args.phone };
      // Reemplaza la persona existente con la persona actualizada en la lista.
      persons[personIndex] = updatedPerson;

      // Retorna la persona actualizada.
      return updatedPerson;
    },
  },
  // Resolutores personalizados para los campos del tipo Person.
  Person: {
    // Resuelve el campo de dirección de una persona.
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
    // Resuelve el campo canDrink para determinar si una persona puede beber según su edad.
    canDrink: (root) => root.age > 18,
    // Resuelve el campo check que retorna un valor constante.
    check: () => "Cristian",
  },
};

// Creación del servidor Apollo con el esquema y los resolutores definidos.
const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers,
});

// Inicia el servidor y muestra la URL de acceso en la consola.
server.listen().then(({ url }) => {
  console.log(`Servidor listo en ${url}`);
});
