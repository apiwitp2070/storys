module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'storis'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'postgres'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});

/*
6c0fb407ec7e164ec0335af86f4ec0a2a9730c845ce9098f24b806a51c612959d8630808926bb2c40cb1eb3a342550b0190dc9b4fc39a6f5644d5c3157edac
bf2006e50f3f975cce2e75c6b5f6a080f751df95ee02ea9b04388f4ac8790ba54905843ca90a53a000b1bb1dc79d82bdd520e3c2ca919f321d09318e4db5f22b64
*/