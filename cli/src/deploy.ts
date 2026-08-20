import * as Midnight from '@midnight-ntwrk/midnight-js-protocol';

async function deploy() {
  console.log('🚀 Cygnus — Deploying to Midnight PreProd...\n');

  // Configuration for Midnight PreProd
  const config = {
    node: 'wss://rpc.preprod.midnight.network',
    indexer: 'https://indexer.preprod.midnight.network/api/v1/graphql',
    proofServer: 'http://localhost:6300'
  };

  console.log('Network configuration:');
  console.log(JSON.stringify(config, null, 2));
  console.log('\nTo deploy:');
  console.log('1. Make sure proof server is running: docker run -p 6300:6300 midnightntwrk/proof-server:8.1.0 midnight-proof-server -v');
  console.log('2. Run: npm run setup -- --network preprod');
  console.log('3. Fund wallet at: https://midnight-tmnight-preprod.nethermind.dev/');
  console.log('4. Contract address will be saved to .midnight-state.json');
}

deploy().catch(console.error);
