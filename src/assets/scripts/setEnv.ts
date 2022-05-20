/* tslint:disable */
// @ts-nocheck
const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();

const environment = argv.environment;

// Checks command line argument: `prod` is production
const isProduction = environment === 'prod';

function writeFileUsingFS(targetPath, environmentFileContent) {
  writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
      console.log(err);
    }
    if (environmentFileContent !== '') {
      console.log(`wrote variables to ${targetPath}`);
    }
  });
}

// path to the `environments` directory
const envDirectory = './src/environments';

// creates the `environments` directory if it does not exist
if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

// choose the correct targetPath based on the environment chosen
const targetPath = isProduction
  ? './src/environments/environment.prod.ts'
  : './src/environments/environment.ts';


// creates the files with no content
writeFileUsingFS('./src/environments/environment.prod.ts', '');
writeFileUsingFS('./src/environments/environment.ts', '');

// content to be compiled dynamically
const environmentFileContent = `// This file was autogenerated by dynamically running setEnv.ts and using dotenv for managing API key secrecy
export const environment = {
  production: ${isProduction},
  aws: {
    identityPoolId: '${process.env.AWS_POOL_ID}',
    defaultRegion: 'us-east-2',
  },
  s3: {
    baseUrl: 'https://s3.us-east-2.amazonaws.com/',
    bucketName: 'ryan-portfolio-bucket',
  },
  dynamoDb: {
    region: 'us-west-2',
    pageTable: 'ryan-portfolio-pages',
  }
};
`;

// appends data into the target file
writeFileUsingFS(targetPath, environmentFileContent);

/* tslint:enable */