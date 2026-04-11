import { defineConfig } from 'orval';

export default defineConfig({
  TickTask: {
    input: './src/api/generated.json', // Path to your spec (or a URL)
    output: {
      mode: 'tags-split',    // Splits files by OpenAPI tags (e.g., user.ts, pet.ts)
      target: './src/api/generated/endpoints',
      schemas: './src/api/generated/model',
      client: 'react-query', // Options: 'react-query', 'vue-query', 'swr', 'axios'
      mock: true,            // Optional: Generates MSW mocks
      override: {
        mutator: {
          path: './src/api/axios-instance.ts', // Custom axios instance
          name: 'customInstance',
        },
      },
    },
  },
});