document.addEventListener("DOMContentLoaded", function() {

  const courseContainer = document.querySelector('#course-container')
  const courseDetails = document.querySelector('#course-detail')
  const studentForm = document.querySelector('#student-form')
  let editForm = null
  courseDetails.innerHTML += `<ul></ul>`

  fetch('https://warm-shore-17060.herokuapp.com/api/v1/users/11/courses/')
  .then(r => r.json())
  .then(data => {
    data.forEach(teacher =>{
      courseContainer.innerHTML +=`
        ${teacher.name}<br><br>
        ${teacher.instructor}<br><br>
        ${teacher.semester}<br><br>
        <button class='detail' id=${teacher.id}>see details</button><br><br>
      `
    })
  })

  courseContainer.addEventListener('click', e => {
    if (e.target.className === 'detail'){
      classId = e.target.id
      fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/11/courses/${classId}`)
      .then(r => r.json())
      .then(data => {
        courseDetails.firstElementChild.innerHTML =''
        data.students.forEach(student => {
          courseDetails.firstElementChild.innerHTML += `
          <li id=${student.id}>
            ${student.name}  ${student.percentage}
          </li>
          `
        })
      })
    }

    courseDetails.addEventListener('click', e => {
      let studentId = e.target.id
      fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/11/students/${studentId}`)
      .then(r => r.json())
      .then(data => {
        console.log(data);
        studentForm.innerHTML =`
        ${data.name}<br><br>
        ${data.class_year}<br><br>
        ${data.percentage}<br><br>
        <form id="edit">
          percentage:
          <input type="text" name="percentage">
          <input type="submit" value="edit">
        </form>`
        editForm = document.querySelector('#edit')

        editForm.addEventListener("submit", e =>{
          e.preventDefault()
          let per = {percentage:e.target[0].value}
          fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/11/students/${studentId}`, {
          method: 'PATCH',
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(per),
          })
          .then(r => r.json())
          .then(data => {
            fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/11/courses/${classId}`)
            .then(r => r.json())
            .then(data => {
              courseDetails.firstElementChild.innerHTML =''
              data.students.forEach(student => {
                courseDetails.firstElementChild.innerHTML += `
                <li id=${student.id}>
                  ${student.name}  ${student.percentage}
                </li>
                `
              })
            })
          })
        })

      })
    })

  })



});
