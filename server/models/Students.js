class Students {
  tableName = "students"

  static getAll(){
    return `SELECT * FROM students`
  }
    
  static getOne(){
    return `SELECT * FROM students WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO students(id,created_at,updated_at,name,term,university_id,faculty_id,year_id,specialization_id,section_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`
  }


  static update(){
    return `UPDATE students SET id=$1,created_at=$2,updated_at=$3,name=$4,term=$5,university_id=$6,faculty_id=$7,year_id=$8,specialization_id=$9,section_id=$10 WHERE id=$11`
  }

  static delete(){
    return `DELETE FROM students WHERE id=$1`
  }
}

module.exports = Students
    
    