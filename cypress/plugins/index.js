// *********************************************************** 
// This example plugins/index.js can be used to load plugins 
// 

// You can change the location of this file or turn off loading 
// the plugins file with the 'pluginsFile' configuration option. 
// 

// You can read more here: 
// https://on.cypress.io/plugins-guide 
// *********************************************************** 

// This function is called when a project is opened or re-opened (e.g. due to the project's config changing) 
// promisified fs module 
const path = require('path'); 
const fs = require('fs-extra'); 

function getConfigurationByFile(file) { 
  const pathToConfigFile = path.resolve( 
    'cypress/config', 
    `cypress.${file}.json` 
  ); 

  return fs.readJson(pathToConfigFile); 
}

module.exports = (on, config) => { 
  // accept a configFile value or use kerava by default 
  const file = config.env.configFile || 'kerava'; 
  return getConfigurationByFile(file); 
}; 

// // cypress-ntlm-auth
// const ntlmAuth = require("cypress-ntlm-auth/dist/plugin");
// module.exports = (on, config) => {
//   config = ntlmAuth.initNtlmAuth(config);
//   return config;
// };  