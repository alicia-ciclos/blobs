# Blobs API

Blobs API es una aplicación escrita en Node.js, que proporciona una API básica para implementar un foro en entorno cliente.
Requiere acceso a una base de datos MongoDB.

## Configuración

Antes de ejecutar la aplicación, necesitaremos crear un archivo `.env` que defina las siguientes variables de entorno:

### `PORT`
Indica el puerto en el que escuchará el servidor express

### `MIGRATE`
Indica si al iniciar el servidor ha de ejecutar las migraciones pendientes en la base de datos.
Normalmente se ejecuta con el valor `1` la primera vez, o cada vez que hay una migración
nueva pendiente de ejecutarse sobre la base de datos que estemos usando, y luego se vuelve
a poner a `0`.

### `MONGO_URI`
La URL completa a la base de datos MongoDB que ha de utilizar la aplicación.

### Ejemplo de archivo `.env`
```
PORT=3030
MIGRATE=1
MONGO_URI="mongodb://127.0.0.1:27017/blobs_api"
```

## Ejecución

### Inicio en modo desarrollo

`$ npm start:dev`

Consultar la sección `scripts` en `package.json` para ver otras operaciones disponibles.
