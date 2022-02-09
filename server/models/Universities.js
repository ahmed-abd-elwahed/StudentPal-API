class Universities {
  tableName = "universities"

  static getAll(){
    return `SELECT * FROM universities`
  }
    
  static getOne(){
    return `SELECT * FROM universities WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO universities(id,created_at,updated_at,name,logo) VALUES($1,$2,$3,$4,$5)`
  }


  static update(){
    return `UPDATE universities SET id=$1,created_at=$2,updated_at=$3,name=$4,logo=$5 WHERE id=$6`
  }

  static delete(){
    return `DELETE FROM universities WHERE id=$1`
  }
}

module.exports = Universities
    
    