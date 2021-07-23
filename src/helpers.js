
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

export const validURL = (url) => {
    const string = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    const regex = new RegExp(string);
    
    return url.match(regex);
}
    