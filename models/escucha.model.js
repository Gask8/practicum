const sql = require("./db.js");

// constructor
const Escucha = function(escucha) {
  this.id_escucha = escucha.id_escucha
  this.id_doliente = escucha.id_doliente;
  this.id_voluntario = escucha.id_voluntario;
  this.fecha = escucha.fecha;
  this.hora_termino = escucha.hora_termino;
  this.se_cumplio = escucha.se_cumplio;
  this.comentario = escucha.comentario;
};

Escucha.create = (newEscucha, result) => {
  sql.query("INSERT INTO escucha SET ?", newEscucha, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created escucha: ", { id: res.id_escucha, ...newEscucha });
    result(null, { id: res.id_escucha, ...newEscucha });
  });
};

Escucha.findById = (id_escucha, result) => {
  sql.query("SELECT * FROM escucha WHERE id_escucha = ?", id_escucha, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found escucha: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Example with the id
    result({ kind: "not_found" }, null);
  });
};

Escucha.getAll = result => {
  sql.query("SELECT * FROM escucha", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
	  console.log("found all escuchas: ");
    // console.log("examples: ", res);
    result(null, res);
  });
};

Escucha.updateById = (id_escucha, escucha, result) => {
  sql.query(
    "UPDATE escucha SET id_doliente = ?, id_voluntario = ?, fecha = ?, hora_termino = ?, se_cumplio = ?, comentario = ?, WHERE id_escucha = ?",
    [escucha.id_doliente, escucha.id_voluntario, escucha.fecha, escucha.hora_termino,
	 escucha.se_cumplio, escucha.comentario, id_escucha],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Example with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated escucha: ", { id: id_escucha, ...escucha });
      result(null, { id: id_escucha, ...escucha });
    }
  );
};

Escucha.remove = (id_escucha, result) => {
  sql.query("DELETE FROM escucha WHERE id_escucha = ?", id_escucha, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Example with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted escucha with id: ", id_escucha);
    result(null, res);
  });
};

Escucha.removeAll = result => {
  sql.query("DELETE FROM escucha", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} escuchas`);
    result(null, res);
  });
};

module.exports = Escucha;