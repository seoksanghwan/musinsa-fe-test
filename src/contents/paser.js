import parser from 'html-react-parser';

export const deltaToConvert = delta => {
  if (typeof delta === 'string') {
    return delta;
  }
};

export const parseDeltaToReactElement = (delta) => {
  return parser(deltaToConvert(delta));
};