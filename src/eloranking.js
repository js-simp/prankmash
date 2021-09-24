//the ELO ranking function

const K = 200;

function ELOrank(prankArr, [winIndex, loseIndex]){
  let Ri = prankArr[winIndex].rating;
  let Rj = prankArr[loseIndex].rating;
  let Ei = 1/(1+10**((Rj-Ri)/400));
  let Ej = 1/(1+10**((Ri-Rj)/400));
  let Ri_new = Ri + K*(1 - Ei);
  let Rj_new = Ri + K*(0 - Ej);
  return [Ri_new, Rj_new]
}

export default ELOrank