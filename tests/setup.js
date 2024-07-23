const Sails = require('sails');

beforeAll((done) => {
  Sails.lift({
    // configuration for testing
    hooks: {
      grunt: false, // disable grunt hook
    },
    log: {
      level: 'warn', // set log level to 'warn'
    },
  }, (err, sailsInstance) => {
    if (err) {
      return done(err);
    }
    global.sails = sailsInstance; // make sails globally accessible
    return done();
  });
});

afterAll((done) => {
  Sails.lower(done);
});
