# Repositorio Template

La finalidad del presente repositorio es contar con una configuración base para futuros repositorios. Esta configuración cuenta con:

> **Nota :** La rama inicial del repositorio es `init`, la cual al final de todo el proceso será eliminada y se generará la rama `main`.

## Características

### Integración para el Manejo de Conventional Commits

-   **Wizard** para una correcta redacción del commit.
-   **Linter** para revisar que el commit cumpla con el estándar establecido.

> **Nota :** Al realizar la instalación de las dependencias del proyecto, se habilitará el comando `git cz`, el cual permite el uso del wizard.

```bash
# Para mandar cambios se procede de la misma manera que siempre.
$ git add -A
$ git cz
```

### Definición de Standard Version (Automático)

-   Para versiones productivas.
-   Para versiones beta.

> **Nota :** Estas opciones se ejecutarán automáticamente siempre que se mande un PR a la rama `beta` o `main` (en este caso, también actualiza las ramas develop y beta).

### Templates para

-   Redacción de Issues.
    -   Template para reportar bugs
    -   Template para solicitur de features
    -   Template para menejo de configuraciones
-   Redacción de PRs.
    -   Este template se carga automaticamente al generar un PR

### Etiquetas Custom

-   Para referencias en los PRs o Issues.

### Configuraciones

-   **EditorConfig**: Para mantener la consistencia del código entre distintos editores.
-   **Prettier**: Para formateo de código básico.

### Ramas

-   **develop**: Rama principal para desarrollo. Utilizada para subir los desarrollos.
-   **beta**: Rama para el manejo de versiones beta.
-   **main**: Rama principal para versiones productivas (crear al finalizar la configuración inicial).

### Worflows (Git Actions)

Grupo de acciones que permite configurar inicialmente el repositorio y manejar los releases.

## Como usar este template

1. Crear un nuevo repositorio utilizando este como base
2. Generar un [personal token](https://github.com/settings/tokens) depues de generarlo copiar el HASH.
3. Agregar el HASH en el repositorio creado en la seccion [secret and variables](../../settings/secrets/actions) y agregarlo en Repository secrets con el nomre **MY_TOKEN**.
4. Agregar en el mismo apartado un secret llamado **USER** y otro nombrado **EMAIL** los cuales serviran para firmar los commits que generen los actions.
5. Ir a la seccion [action -> general](../../settings/actions) y seleccionar la opcion **Workflow permissions => Read and write permissions** y gardar los cambios.
6. Por ultimo crear la rama **main**.
