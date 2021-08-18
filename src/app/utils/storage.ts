const setPartida = (cdPartida) => {
    localStorage['partidaAtual'] = cdPartida;
    setTimeout(() => {
        removerPartida();
    }, 3600000);
}

const removerPartida = () => delete localStorage['partidaAtual'];

const getPartida = () => localStorage['partidaAtual'];

const partida = {
    removerPartida,
    setPartida,
    getPartida
}

export {
    partida
}