/*
Copyright by Oleg Efimov and node-mysql-libmysqlclient contributors
See contributors list in README

See license text in LICENSE file
*/

// Load configuration
var cfg = require('../config');

exports.createTestTableSimple = function (test) {
  test.expect(3);
  
  var
    conn = cfg.mysql_libmysqlclient.createConnectionSync(cfg.host, cfg.user, cfg.password, cfg.database),
    res,
    tables;
  
  test.ok(conn, "mysql_libmysqlclient.createConnectionSync(host, user, password, cfg.database)");
  
  conn.querySync("DROP TABLE IF EXISTS " + cfg.test_table + ";");
  conn.querySync("CREATE TABLE " + cfg.test_table +
    " (id INT(8) NOT NULL AUTO_INCREMENT, " +
    "random_number INT(8) NOT NULL, " +
    "random_boolean BOOLEAN NOT NULL, " +
    "PRIMARY KEY(id)) " + cfg.store_engine + ";");
  res = conn.querySync("SHOW TABLES");
  test.ok(res.fieldCount === 1, "SHOW TABLES result field count === 1");
  tables = res.fetchAllSync();
  test.ok(tables.some(function (r) {
    return r['Tables_in_' + cfg.database] === cfg.test_table;
  }), "Find the test table in result");
  
  conn.querySync("DROP TABLE IF EXISTS " + cfg.test_table_notexists + ";");
  
  conn.closeSync();
  
  test.done();
};

