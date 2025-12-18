module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // 1. Metadata para Inversify (OBLIGATORIO PRIMERO si usas Inversify)
      'babel-plugin-transform-typescript-metadata',

      // 2. Decoradores (Legacy) - OBLIGATORIO SEGUNDO
      ['@babel/plugin-proposal-decorators', { legacy: true }],

      // 3. Propiedades de clase (Loose) - OBLIGATORIO TERCERO
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
  };
};