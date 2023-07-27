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
      console.log(
        `parsed env variable: ${
          !process.env.S3_BUCKET_NAME ? 'FAILED' : 'SUCCESS'
        }`
      );
    }
  });
}

// path to the `environments` directory
const envDirectory = './src/environments';

// creates the `environments` directory if it does not exist
if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

// creates the files with no content
writeFileUsingFS('./src/environments/environment.prod.ts', '');
writeFileUsingFS('./src/environments/environment.ts', '');

// content to be compiled dynamically
const environmentFileContent = `// This file was autogenerated by dynamically running setEnv.ts and using dotenv for managing API key secrecy
export const environment = {
  production: ${isProduction},
  icons: {
    primary: 'assets/siteLogos/RyanFennessey_logo_V2.svg',
    small: 'assets/siteLogos/RyanFennessey_logo_footer_initials_V2.svg',
  },
  apiBaseUrl: '${process.env.API_BASE_URL}',
  s3: {
    baseUrl: '${process.env.S3_BASE_URL}',
    bucketName: '${process.env.S3_BUCKET_NAME}',
  },
  useCache: ${isProduction},
  disableEdit: ${isProduction},
};`;

// appends data into the target file(s)
writeFileUsingFS('./src/environments/environment.ts', environmentFileContent);
if (isProduction)
  writeFileUsingFS(
    './src/environments/environment.prod.ts',
    environmentFileContent
  );

/* tslint:enable */
