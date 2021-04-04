'use strict'

export const Perceptron = (p = null, r = null) => {
    let w1 = 0;
    let w2 = 0;
    const P = p ?? 4;
    const learningRate = r ?? 0.1;
    
    const catculateSignal = ([x1, x2]) => w1 * x1 + w2 * x2;
    const getDelta = (y, delta = P - y) => delta > 0 ? delta: 0;
    const weightAdjustment = ([x1, x2], delta) => {
        console.dir(delta)
        w1 += delta * x1 * learningRate;
        w2 += delta * x2 * learningRate;
    }
    return {
        learn: (input, maxIterations, maxTime) => {
            let time = 0;
            let iterations = 0;
            while(maxIterations > iterations && maxTime > time) {
                const startTime = new Date().getSeconds();
                input.map(point => {
                    const y = catculateSignal(point);
                    const delta = getDelta(y);
                    weightAdjustment(point, delta);
                    console.dir({w1, w2, point, delta});
                })
                const endTime = new Date().getSeconds(); 
                time += endTime - startTime;
                iterations++;
            }
            return {w1, w2, time, iterations};
        }
    }
}