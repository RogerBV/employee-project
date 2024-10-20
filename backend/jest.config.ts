import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest', // Usa ts-jest para transformar archivos TypeScript
  },
  moduleFileExtensions: ['ts', 'js'],
};

export default config;