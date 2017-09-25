const express = require('express');
const app = express();
const pg = require('pg');
const port = process.env.PORT || 3000;

const config = {
  connectionString: 'postgres://qdvdfhva:AjPAENHlCP2l3wNZvdP7VavrO8WfTRA4@stampy.db.elephantsql.com:5' +
      '432/qdvdfhva',
  max: 10,
  idleTimeoutMillies: 3000
}

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    pg.connect(config, (err, client, done) => {
      if (err) return reject(err);
      client.query(query, (err, result) => {
        done();
        if (err) return reject(err);
        resolve (result.rows);
      })
    })
  })
}
const queries = {
  1: "SELECT pessoa_cpf AS cpf FROM (funcionario JOIN gerente ON id_funcionario=funcio" +
      "nario_id);",
  2: "SELECT carga_horaria FROM (funcionario JOIN gerente ON id_funcionario=funcionario_id) JOIN loja ON (gerente_id=id_gerente) WHERE id_loja='L01';",
  3: "SELECT preco, nome_produto FROM produto JOIN setor ON setor_id = id_setor WHERE " +
      "nome_setor = 'Hortifruti' ORDER BY preco;",
  4: "SELECT nome_setor, count(*) AS quantidade_produtos FROM setor JOIN produto ON (se" +
      "tor_id = id_setor) GROUP BY nome_setor HAVING count(*) > 5;",
  5: "SELECT DISTINCT cidade FROM pessoa JOIN endereco on endereco_cep = cep WHERE cpf" +
      " LIKE '8%5';",
  6: "SELECT nome_pessoa, numero_guiche, carga_horaria FROM caixa NATURAL JOIN funcion" +
      "ario NATURAL JOIN pessoa ORDER BY (nome_pessoa);"

}
app.use(express.static('public'));

app.get('/find', (req, res) => {
  const query = queries[req.query.opt];
  console.log(query);
  executeQuery(query)
    .then((result)=> res.status(200).send(result))
    .catch((err)=> {
      console.log(err);
      res.status(400).send(err); 
    })
})

app.listen(port, () => console.log('Listening'));