const convict = require('convict');
const yml = require("js-yaml");

const getConfig = (filePath) => {

  // Adicionando parser de yml
  convict.addParser({ extension: ['yml', 'yaml'], parse: yml.load });

  // Instanciando schema
  const config = convict({

    // Nome da configuração
    domain: {

      // Doc da configuração
      doc: 'The external service domain.',

      // Formato para validação do campo
      format: String,

      // Valor padrão da configuração
      default: '',

      // Nome da variável de ambiente da configuração
      env: 'PREFIX_DOMAIN'
    },
  });

  // Carrega arquivo de configuração
  config.loadFile(filePath);

  // Valida o schema
  config.validate({ allowed: 'strict' });

  return config
}

// Só usar :D
const config = getConfig('./config.yml')
console.log(config.get("domain"))