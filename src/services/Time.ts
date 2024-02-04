export const sleep = async (ms: number) => {
    await new Promise(resolve => {
        setTimeout(() => resolve(null), ms);
    });
}

export const contagemRegressiva = (contador: number, callback: (tempoRestante: number) => void) => {
    setTimeout(() => {
        if (contador > 0) {
            callback(contador - 1);
            contagemRegressiva(contador - 1, callback);
        }
    }, 1000);
}

