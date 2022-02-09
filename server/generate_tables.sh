generate -m assignments -c assignments id created_at updated_at deadline description start_time duration section_id course_id user_id likes assign_type
generate -m courses -c courses id created_at updated_at name term specialization_id
generate -m data -c data id created_at updated_at title url course_id
generate -m faculties -c faculties id created_at updated_at name logo university_id
generate -m news -c news id created_at updated_at title url description likes course_id section_id specialization_id user_id
generate -m profiles -c profiles id created_at updated_at photo likes description student_id
generate -m sections -c sections id created_at updated_at number specialization_id
generate -m specializations -c specializations id created_at updated_at name year_id
generate -m students -c students id created_at updated_at name term university_id faculty_id year_id specialization_id section_id
generate -m students_courses -c students_courses id created_at updated_at course_id student_id
generate -m universities -c universities id created_at updated_at name logo
generate -m users -c users id created_at updated_at role student_id
generate -m years -c years id created_at updated_at number name faculty_id