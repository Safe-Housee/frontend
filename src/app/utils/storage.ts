const setPartida = (cdPartida) => {
    sessionStorage.setItem('partidaAtual', cdPartida);
    setTimeout(() => {
        removerPartida();
    }, 3600000);
}

const removerPartida = () => sessionStorage.removeItem('partidaAtual');

const getPartida = () => Number(sessionStorage.getItem('partidaAtual'));
const getUsuario = () => Number(sessionStorage.getItem('cdUsuario'));
const getNmUsuario = () => sessionStorage.getItem('nmUsuario');
const getUserEmail = () => sessionStorage.getItem('email');
const partida = {
    removerPartida,
    setPartida,
    getPartida
}

const usuario = {
    getUsuario,
    getNmUsuario,
    getUserEmail
}

export {
    partida,
    usuario
}