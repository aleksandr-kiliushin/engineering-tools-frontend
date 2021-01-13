export const scales = {
  p: {
    bar: 'bar',
    mpa: 'mpa',
    mh2o: 'mh2o',
    kgcm2: 'kgcm2',
  },
};

export const fromBar = (input, scale) => {
  input = +input;
  let output;
  switch(scale) {
    case scales.p.bar: {output = input; break;}
    case scales.p.mpa: {output = input * 0.1; break;}
    case scales.p.mh2o: {output = input * 10.1972; break;}
    case scales.p.kgcm2: {output = input * 1.01972; break;}
    default: {
      console.error('scale is not defined.');
      return 0;
    }
  }
  return +output.toFixed(2);
}

export const toBar = (input, scale) => {
  input = +input;
  switch(scale) {
    case scales.p.bar: {return input;}
    case scales.p.mpa: {return input / 0.1;}
    case scales.p.mh2o: {return input / 10.1972;}
    case scales.p.kgcm2: {return input / 1.01972;}
    default: {
      console.error('scale is not defined.');
      return 0;
    }
  }
}