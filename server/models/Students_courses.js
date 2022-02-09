class Students_courses {
  tableName = "students_courses"

  static getAll(){
    return `SELECT * FROM students_courses`
  }
    
  static getOne(){
    return `SELECT * FROM students_courses WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO students_courses(id,created_at,updated_at,course_id,student_id) VALUES($1,$2,$3,$4,$5)`
  }


  static update(){
    return `UPDATE students_courses SET id=$1,created_at=$2,updated_at=$3,course_id=$4,student_id=$5 WHERE id=$6`
  }

  static delete(){
    return `DELETE FROM students_courses WHERE id=$1`
  }
}

module.exports = Students_courses
    
    