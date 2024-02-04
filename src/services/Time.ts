export const sleep = async (ms: number) => {
    await new Promise(resolve => {
        setTimeout(() => resolve(null), ms);
    });
}

export const contagemRegressiva = (contador: number, callback: (tempoRestante: number) => void) => {
    callback(contador);
    setTimeout(() => {
        if (contador > 0) {
            contagemRegressiva(contador - 1, callback);
        }
    }, 1000);
}

