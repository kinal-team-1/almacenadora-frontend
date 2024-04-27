# Almacenadora de Productos - Frontend

Este es el repositorio del frontend de la aplicación web "Almacenadora de Productos", desarrollado con React. La aplicación permite a los usuarios crear, leer, actualizar y eliminar tareas, así como marcarlas como completadas o incompletas.

Este es el [demo de la aplicación](https://almacenadora-kinal-fr-6406c0b91a72.herokuapp.com/), y aquí está la [API en deploy](https://almacenadora-kinal-backend-a1957ef7f11d.herokuapp.com/) también.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

1. **Frontend**: Este repositorio, desarrollado con React.
2. **Backend**: Desarrollado con Node.js y Express, se encuentra en el repositorio [`backend`](https://github.com/kinal-team-1/almacenadora-backend).

## Contribución al Proyecto

Para contribuir al proyecto, sigue estos pasos:

1. **Crea una rama a partir de `develop`**:
   - Asegúrate de tener la rama `develop` actualizada: `git checkout develop && git pull`
   - Crea una nueva rama con un nombre descriptivo: `git checkout -b <BRANCH_TYPE>/<PREFIX>-<INCIDENCIA>/<NOMBRE_DESCRIPTIVO>`
   en donde `BRANCH_TYPE` puede ser uno de [`feature`, `fix`, `hotfix`], `PREFIX` debe ser el identificador del proyecto, `INCIDENCIA` debe ser el número de task asignada, y `NOMBRE_DESCRIPTIVO` es un nombre a tu gusto describiendo el propósito de la rama
   ejemplo:
   
   `git checkout -b feature/ALM-4/agregar-componente-tarea`

2. **Realiza tus cambios**:
   - Realiza los cambios necesarios en tu rama.

3. **Verifica el código**:
   - Asegúrate de que tu código siga las pautas de estilo y lint configuradas.
   esto lo puedes hacer con `npm run lint`

4. **Realiza un pull request a `develop`**:
   - Haz push de tus cambios a tu rama remota: `git push origin <RAMA>` o `git push --set-upstream origin <RAMA>`
   - Crea un pull request desde tu rama a `develop` en GitHub.
   - Asegúrate de que el CI (Continuous Integration) pase correctamente antes de pedir la code review.

## Configuración del Proyecto

1. Instala las dependencias: `npm install`
2. Inicia el servidor de desarrollo: `npm run dev`

La aplicación estará disponible en `http://localhost:5173`.

## Despliegue

El despliegue de la aplicación se realizará automáticamente en un entorno de producción cuando se fusionen los cambios en la rama `develop`.

## Recursos y Documentación

- [Documentación de React](https://reactjs.org/docs/getting-started.html)

Si tienes alguna pregunta o necesitas ayuda, no dudes en preguntar al equipo de desarrollo.