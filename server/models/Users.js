class Users {
  tableName = "users"

  static getAll(){
    return `SELECT * FROM users`
  }
    
  static getOne(){
    return `SELECT * FROM users WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO users(id,created_at,updated_at,role,student_id) VALUES($1,$2,$3,$4,$5)`
  }


  static update(){
    return `UPDATE users SET id=$1,created_at=$2,updated_at=$3,role=$4,student_id=$5 WHERE id=$6`
  }

  static delete(){
    return `DELETE FROM users WHERE id=$1`
  }
}

module.exports = Users
    
    