class Profiles {
  tableName = "profiles"

  static getAll(){
    return `SELECT * FROM profiles`
  }
    
  static getOne(){
    return `SELECT * FROM profiles WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO profiles(id,created_at,updated_at,photo,likes,description,student_id) VALUES($1,$2,$3,$4,$5,$6,$7)`
  }


  static update(){
    return `UPDATE profiles SET id=$1,created_at=$2,updated_at=$3,photo=$4,likes=$5,description=$6,student_id=$7 WHERE id=$8`
  }

  static delete(){
    return `DELETE FROM profiles WHERE id=$1`
  }
}

module.exports = Profiles
    
    