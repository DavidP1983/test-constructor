import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
})

const config: Config = {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    maxWorkers: "50%",
    moduleDirectories: ['src', 'node_modules'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}

export default createJestConfig(config);