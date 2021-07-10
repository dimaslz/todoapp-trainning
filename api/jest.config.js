module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        // "**/test/**/*.test.(ts|js)",
        "**/src/**/*.test.(ts|js)"
    ],
    testEnvironment: "node",
    // modulePathIgnorePatterns: ["db-handler"]
    collectCoverageFrom: [
        "**/src/**/*.(ts|js)"
    //     "**/test/**/*.test.(ts|js)"
    // //     "test/**/{!(settings),}.ts"
    // //     // "test/{!(db-handler),}.ts"
    ],
    // coveragePathIgnorePatterns: [
    //     "**/test/settings/"
    // ]
    // modulePathIgnorePatterns: ["<rootDir>/test/db-handler"]
    // preset: "@shelf/jest-mongodb",
};
