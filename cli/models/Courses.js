class Courses {
  tableName = "courses"

  static getAll(){
    return `SELECT * FROM courses`
  }
    
  static getOne(){
    return `SELECT * FROM courses WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO courses(name,term,year_id,specialization_id) VALUES($1,$2,$3,$4)`
  }


  static update(){
    return `UPDATE courses SET name=$1,term=$2,year_id=$3,specialization_id=$4 WHERE id=$5`
  }

  static delete(){
    return `DELETE FROM courses WHERE id=$1`
  }
}

module.exports = Courses
    
    