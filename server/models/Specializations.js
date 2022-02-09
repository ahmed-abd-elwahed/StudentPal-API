class Specializations {
  tableName = "specializations"

  static getAll(){
    return `SELECT * FROM specializations`
  }
    
  static getOne(){
    return `SELECT * FROM specializations WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO specializations(id,created_at,updated_at,name,year_id) VALUES($1,$2,$3,$4,$5)`
  }


  static update(){
    return `UPDATE specializations SET id=$1,created_at=$2,updated_at=$3,name=$4,year_id=$5 WHERE id=$6`
  }

  static delete(){
    return `DELETE FROM specializations WHERE id=$1`
  }
}

module.exports = Specializations
    
    