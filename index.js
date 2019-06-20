document.addEventListener("DOMContentLoaded", function() {

console.log("The dom has loaded")

  const courseContainer = document.querySelector('#course-container')
  const studentList = document.querySelector('#course-detail')
  const studentForm = document.querySelector('#student-form')

  COURSE_URL = "https://warm-shore-17060.herokuapp.com/api/v1/users/10/courses/"
  STUDENT_URL = "https://warm-shore-17060.herokuapp.com/api/v1/users/10/students"
  STUDENT_PATCH = "https://warm-shore-17060.herokuapp.com/api/v1/users/10/students"

  function renderCourses(courses) {
    courses.forEach(course => {
      courseContainer.innerHTML +=`
        <li> ${course.name} </li><br>
        <li> ${course.instructor}</li><br>
        <li> ${course.semester} </li><br>
      <button class="button" data-id="${course.id}" type="button"> See details </button>
      `
    })
  }
  function fetchCourses() {
    return fetch(COURSE_URL)
    .then(rsp => rsp.json())
    .then(courses => {
      renderCourses(courses)
      })
  }

  function renderClassList(classList) {
    studentArray = classList.students
   classList.students.forEach(student => {
      studentList.innerHTML +=`
      <li class="student" data-id="${student.id}"> ${student.name}, ${student.percentage}</li><br>
      `
    })
  }

  function fetchStudents(courseId) {
    fetch(`${COURSE_URL}/${courseId}`)
    .then(rsp => rsp.json())
    .then(classList => {
      renderClassList(classList)
    })
  }


  function renderSingleStudent(student) {
    studentForm.innerHTML =`
      <span> ${student.name} </span><br>
      <span>${student.id} </span><br>
      <span>${student.percentage} </span><br>
      <input type="text" placeholder="Edit">
      <button class="edit" type="edit"> Edit</button>
    `
  }

  function fetchSingleStudent(studentId) {
    fetch(`${STUDENT_URL}/${studentId}`)
    .then(rsp => rsp.json())
    .then(student => {
      renderSingleStudent(student)
    })
  }


  studentForm.addEventListener('click', event => {
      if (event.target.className === "edit") {
        console.log(event.target)
        let studentId = parseInt(event.target.parentElement.getElementsByTagName('span')[1].innerText)
        let addPoints = parseInt(event.target.parentElement.getElementsByTagName('input')[0].value)
        let gradeTag = event.target.parentElement.getElementsByTagName('span')[2]
        let gradeNum = parseInt(gradeTag.innerText)
        let newPercentage = gradeTag.innerText = (gradeNum + addPoints)

        fetch(`${STUDENT_PATCH}/${studentId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            percentage: newPercentage
          })
        })
      }
  })

  studentList.addEventListener('click', event => {
      if (event.target.className === "student") {
        let studentId = event.target.dataset.id
        fetchSingleStudent(studentId)
      }
  })

  courseContainer.addEventListener('click', event => {
      if (event.target.className === "button") {
        let courseId = event.target.dataset.id
        fetchStudents(courseId)
      }
  })

  fetchCourses()

});
