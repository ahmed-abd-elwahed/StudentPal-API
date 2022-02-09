class Years {
  tableName = "years"

  static getAll(){
    return `SELECT * FROM years`
  }
    
  static getOne(){
    return `SELECT * FROM years WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO years(id,created_at,updated_at,number,name,faculty_id) VALUES($1,$2,$3,$4,$5,$6)`
  }


  static update(){
    return `UPDATE years SET id=$1,created_at=$2,updated_at=$3,number=$4,name=$5,faculty_id=$6 WHERE id=$7`
  }

  static delete(){
    return `DELETE FROM years WHERE id=$1`
  }
}

module.exports = Years
    
    