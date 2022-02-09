class Data {
  tableName = "data"

  static getAll(){
    return `SELECT * FROM data`
  }
    
  static getOne(){
    return `SELECT * FROM data WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO data(id,created_at,updated_at,title,url,course_id) VALUES($1,$2,$3,$4,$5,$6)`
  }


  static update(){
    return `UPDATE data SET id=$1,created_at=$2,updated_at=$3,title=$4,url=$5,course_id=$6 WHERE id=$7`
  }

  static delete(){
    return `DELETE FROM data WHERE id=$1`
  }
}

module.exports = Data
    
    