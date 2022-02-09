class Assignments {
  tableName = "assignments"

  static getAll(){
    return `SELECT * FROM assignments`
  }
    
  static getOne(){
    return `SELECT * FROM assignments WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO assignments(id,created_at,updated_at,deadline,description,start_time,duration,section_id,course_id,user_id,likes,assign_type) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`
  }


  static update(){
    return `UPDATE assignments SET id=$1,created_at=$2,updated_at=$3,deadline=$4,description=$5,start_time=$6,duration=$7,section_id=$8,course_id=$9,user_id=$10,likes=$11,assign_type=$12 WHERE id=$13`
  }

  static delete(){
    return `DELETE FROM assignments WHERE id=$1`
  }
}

module.exports = Assignments
    
    