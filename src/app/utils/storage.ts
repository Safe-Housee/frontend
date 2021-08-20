const setPartida = (cdPartida) => {
    sessionStorage.setItem('partidaAtual', cdPartida);
    setTimeout(() => {
        removerPartida();
    }, 3600000);
}

const removerPartida = () => sessionStorage.removeItem('partidaAtual');

const getPartida = () => sessionStorage.getItem('partidaAtual');
const getUsuario = () => sessionStorage.getItem('cdUsuario');
const partida = {
    removerPartida,
    setPartida,
    getPartida
}

const usuario = {
    getUsuario
}

export {
    partida,
    usuario
}