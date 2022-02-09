class Faculties {
  tableName = "faculties"

  static getAll(){
    return `SELECT * FROM faculties`
  }
    
  static getOne(){
    return `SELECT * FROM faculties WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO faculties(id,created_at,updated_at,name,logo,university_id) VALUES($1,$2,$3,$4,$5,$6)`
  }


  static update(){
    return `UPDATE faculties SET id=$1,created_at=$2,updated_at=$3,name=$4,logo=$5,university_id=$6 WHERE id=$7`
  }

  static delete(){
    return `DELETE FROM faculties WHERE id=$1`
  }
}

module.exports = Faculties
    
    