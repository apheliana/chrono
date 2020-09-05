const apiMock = require('@ng-apimock/core');
const devInterface = require('@ng-apimock/dev-interface');
const serveStatic = require('serve-static');
const chalk = require('chalk');
const connect = require('connect');
const path = require('path');

// Core functionality of @ng-apimock
apiMock.processor.process({
  src: `${path.resolve(__dirname)}/api-mocks`,
  watch: true,
  patterns: {
    mocks: '**/*.mock.json',
    presets: '**/*.preset.json',
  },
});

const app = connect(); // This can be replaced with express if needed in the future
const port = process.env.PORT || 3000;
const devInterfacePath = '/manage/';

// Assign processor as a middleware for connect/express
app.use(apiMock.middleware);

// Initialize static server for developer interface of @ng-apimock
app.use(devInterfacePath, serveStatic(devInterface));

// Keep server alive
app.listen(port);

console.log('\n');
console.log(chalk.yellow(`@ng-apimock/core is running on port ${port}`));
console.log(chalk.green(`@ng-apimock/dev-interface is running on: http://localhost:${port}${devInterfacePath}`));
console.log('\n');
