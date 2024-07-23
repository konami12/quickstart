/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
require("isomorphic-fetch");
const { labels } = require("./settings");

const CreateLabels = (() => {
    const REPOSITORY = process.argv.pop();
    const OWNER = process.argv.pop();
    const TOKEN = process.argv.pop();
    const __OPTIONS = {
        method: "GET",
        headers: {
            Authorization: `Basic ${btoa(`${OWNER}:${TOKEN}`)}`,
            Accept: "application/vnd.github.v3+json",
        },
    };

    /**
     * Permite conseguir un numero aleatorio del 0 al 255
     *
     * @return  {number}
     */
    const __range = () => Math.floor(Math.random() * (255 - 0)) + 0;

    /**
     * Consigue de manera aleatoria un numero hexadecimal.
     *
     * @return  {string}
     */
    const __getHexacolor = () => {
        let RED = __range().toString(16);
        let GREEN = __range().toString(16);
        let BLUE = __range().toString(16);
        RED = RED.length === 1 ? `0${RED}` : RED;
        GREEN = GREEN.length === 1 ? `0${GREEN}` : GREEN;
        BLUE = BLUE.length === 1 ? `0${BLUE}` : BLUE;
        return `${RED}${GREEN}${BLUE}`;
    };

    /**
     * Formatea la data para cargar campos faltantes.
     *
     * @param  {Object}  Listada de etiquetas.
     * @return  Function.
     */
    const __prepareDate = (listLabel) => {
        let RESULT = [];
        if (listLabel.length > 0) {
            const [first, ...rest] = listLabel;
            if (!first.color) first.color = __getHexacolor();
            RESULT = [first].concat(__prepareDate(rest));
        }
        return RESULT;
    };

    /**
     * Realiza las peticiones al Api de github.
     *
     * @param {string}  [labelName=""]  Nombre de la etiqueta a borrar.
     *
     * @return Array.
     */
    const __requestApi = async (labelName = "") => {
        const REQUEST = await fetch(`https://api.github.com/repos/${REPOSITORY}/labels${labelName}`, __OPTIONS);
        let response = [{ name: labelName, erase: 0 }];
        try {
            response = __OPTIONS.method === "DELETE" ? [{ label: labelName, erase: 1 }] : await REQUEST.json();
        } catch (NotifyError) {
            console.error(NotifyError);
        }
        return response;
    };

    /**
     * Permite conseguir todas las etiquetas del repositorio.
     *
     * @return {Object}
     */
    const __listar = async () => {
        __OPTIONS.method = "GET";
        const DATA = await __requestApi();
        return DATA;
    };

    /**
     * Borrar los labels existentes en el repositorio.
     */
    const __borrar = async () => {
        const LABELS = await __listar();
        let count = 0;
        __OPTIONS.method = "DELETE";
        for (const { name } of LABELS) {
            await __requestApi(`/${name}`);
            count += 1;
        }
        console.log(`Etiquetas borradas = ${count}`);
    };

    /**
     * Permite la creacion de etiquetas utilizando la api de github.
     */
    const __create = async () => {
        const LIST_LABEL = __prepareDate(labels);
        let count = 0;
        __OPTIONS.method = "POST";
        for (const ITEM of LIST_LABEL) {
            __OPTIONS.body = JSON.stringify(ITEM);
            await __requestApi();
            count += 1;
        }
        console.log(`Etiquetas creadas = ${count}`);
    };

    /**
     * Metodo inicializador
     */
    const init = async () => {
        console.group("Proceso de configuracion de etiquetas");
        await __borrar();
        await __create();
        console.groupEnd("Proceso de configuracion de etiquetas");
    };

    return init;
})();

CreateLabels();
