class Sections {
  tableName = "sections"

  static getAll(){
    return `SELECT * FROM sections`
  }
    
  static getOne(){
    return `SELECT * FROM sections WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO sections(id,created_at,updated_at,number,specialization_id) VALUES($1,$2,$3,$4,$5)`
  }


  static update(){
    return `UPDATE sections SET id=$1,created_at=$2,updated_at=$3,number=$4,specialization_id=$5 WHERE id=$6`
  }

  static delete(){
    return `DELETE FROM sections WHERE id=$1`
  }
}

module.exports = Sections
    
    