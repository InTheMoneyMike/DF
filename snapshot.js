import snapshot from '@snapshot-labs/snapshot.js';

const hub = 'https://testnet.snapshot.org';
const client = new snapshot.Client712(hub);

console.log(client)