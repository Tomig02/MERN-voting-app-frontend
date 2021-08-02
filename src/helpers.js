
/**
 * @async
 * @param {String} url url para el fetch
 * @param {{}} message contenido del body
 * @returns {{}| null} resultado del pedido al backend
 */
export const mensajeBackend = async (url, message) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });

    if(response.ok){
        return await response.json();
    }else{
        return null;
    }
}

/**
*   Prueba el url con un regex para saber si tiene un formato valido
*   @param {String} url url a revisar
*   @returns {Boolean} si el url es valido o no
*/
export const validURL = (url) => {
    const string = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    const regex = new RegExp(string);
    
    return url.match(regex);
}
    