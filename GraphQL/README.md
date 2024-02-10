# Documentación del Servidor GraphQL

Este documento proporciona una visión general del servidor GraphQL que utiliza el lenguaje JavaScript con Apollo Server.

## Descripción

El servidor GraphQL definido aquí proporciona un punto de acceso para realizar consultas y mutaciones en una lista de personas. Permite recuperar información sobre las personas, agregar nuevas personas y editar los números de teléfono de las personas existentes.

## Dependencias

El servidor utiliza las siguientes dependencias:

- `apollo-server`: Para crear el servidor GraphQL.
- `uuid`: Para generar identificadores únicos.
- `node-fetch`: Para realizar solicitudes HTTP desde el servidor.

## Esquema GraphQL

El esquema define los tipos de datos, consultas y mutaciones disponibles en el servidor.

### Tipos de Datos

- **`YesNo`**: Enumeración que representa opciones de sí o no.
- **`Address`**: Tipo de objeto que representa una dirección con las propiedades `calle` y `ciudad`.
- **`Person`**: Tipo de objeto que representa a una persona con propiedades como `nombre`, `edad`, `teléfono`, `dirección`, `ID`, `check` y `canDrink`.

### Consultas

- **`personCount`**: Obtiene el número total de personas en la lista.
- **`allPersons`**: Obtiene todas las personas en la lista, opcionalmente filtradas por el campo `teléfono`.
- **`findPerson`**: Encuentra a una persona por su nombre.

### Mutaciones

- **`addPerson`**: Agrega una nueva persona a la lista.
- **`editNumber`**: Edita el número de teléfono de una persona existente.

## Resolutores

Los resolutores son funciones que implementan la lógica para resolver consultas y mutaciones.

### Consultas

- **`personCount`**: Devuelve la longitud de la lista de personas.
- **`allPersons`**: Devuelve todas las personas o las filtra según el argumento `phone`.
- **`findPerson`**: Encuentra y devuelve una persona por su nombre.

### Mutaciones

- **`addPerson`**: Agrega una nueva persona a la lista después de verificar que el nombre sea único.
- **`editNumber`**: Edita el número de teléfono de una persona existente.

### Personalizaciones

- **`address`**: Resuelve la dirección de una persona.
- **`canDrink`**: Determina si una persona puede beber según su edad.
- **`check`**: Retorna un valor constante "Cristian".

## Iniciar el Servidor

El servidor se inicia utilizando el método `listen` de Apollo Server y se puede acceder a través de la URL proporcionada en la consola.

```javascript
server.listen().then(({ url }) => {
  console.log(`Servidor listo en ${url}`);
});
