let publisher = require('@pact-foundation/pact-node');
let path = require('path');

let opts = {
  providerBaseUrl: 'http://localhost:8080',
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: 'https://pact-broker-blue.herokuapp.com/',
  consumerVersion: process.env.VERSION
  // tags: [process.env.BRANCH || 'master']
};

publisher.publishPacts(opts).then(() => console.log("Pacts successfully published"));
