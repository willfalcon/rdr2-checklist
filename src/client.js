import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'z0b41w7s',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2023-08-28', // use current date (YYYY-MM-DD) to target the latest API version
});
