class Users {
  tableName = "users"

  static getAll(){
    return `SELECT * FROM users`
  }
    
  static getOne(){
    return `SELECT * FROM users WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO users(email,name,password,profile_id) VALUES($1,$2,$3,$4)`
  }


  static update(){
    return `UPDATE users SET email=$1,name=$2,password=$3,profile_id=$4 WHERE id=$5`
  }

  static delete(){
    return `DELETE FROM users WHERE id=$1`
  }
}

module.exports = Users
    
    