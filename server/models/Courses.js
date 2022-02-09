class Courses {
  tableName = "courses"

  static getAll(){
    return `SELECT * FROM courses`
  }
    
  static getOne(){
    return `SELECT * FROM courses WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO courses(id,created_at,updated_at,name,term,specialization_id) VALUES($1,$2,$3,$4,$5,$6)`
  }


  static update(){
    return `UPDATE courses SET id=$1,created_at=$2,updated_at=$3,name=$4,term=$5,specialization_id=$6 WHERE id=$7`
  }

  static delete(){
    return `DELETE FROM courses WHERE id=$1`
  }
}

module.exports = Courses
    
    