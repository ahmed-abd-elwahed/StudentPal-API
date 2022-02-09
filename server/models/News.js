class News {
  tableName = "news"

  static getAll(){
    return `SELECT * FROM news`
  }
    
  static getOne(){
    return `SELECT * FROM news WHERE id = $1`
  }

  static insert(){
    return `INSERT INTO news(id,created_at,updated_at,title,url,description,likes,course_id,section_id,specialization_id,user_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`
  }


  static update(){
    return `UPDATE news SET id=$1,created_at=$2,updated_at=$3,title=$4,url=$5,description=$6,likes=$7,course_id=$8,section_id=$9,specialization_id=$10,user_id=$11 WHERE id=$12`
  }

  static delete(){
    return `DELETE FROM news WHERE id=$1`
  }
}

module.exports = News
    
    