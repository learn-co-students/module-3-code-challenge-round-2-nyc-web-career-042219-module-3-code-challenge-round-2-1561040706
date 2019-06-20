document.addEventListener("DOMContentLoaded", function() {

console.log("The dom has loaded")

  const courseContainer = document.querySelector('#course-container')
  const studentList = document.querySelector('#course-detail')
  const studentForm = document.querySelector('#student-form')

  COURSE_URL = "https://warm-shore-17060.herokuapp.com/api/v1/users/10/courses/"
  STUDENT_URL = "https://warm-shore-17060.herokuapp.com/api/v1/users/10/courses/:id"

  let studentObject = {}

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
    let studentObject = classList
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

  function renderStudentForm(studentId) {
  let foundStudent = studentObject.students.find(student => {
    return student.id == studentId
  })
    console.log(foundStudent)
    debugger
    studentForm.innerHTML =`
    `
  }


  studentList.addEventListener('click', event => {
      if (event.target.className === "student") {
        let studentId = event.target.dataset.id
        renderStudentForm(studentId)
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
