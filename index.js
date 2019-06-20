// document.addEventListener("DOMContentLoaded", function() {});

let studentArray = []
const courseContainer = document.querySelector('#course-container')
const courseDetail = document.querySelector('#course-detail')
const studentInfo = document.querySelector('#student-form')

fetch('https://warm-shore-17060.herokuapp.com/api/v1/users/12/courses/')
.then(res => res.json())
.then(data => {
  data.map(course => {


    let courseList = document.createElement('ul')
    let detailBtn = document.createElement('button')
    let courseName = document.createElement('li')
    let courseInstructor = document.createElement('li')
    let courseSemester = document.createElement('li')
    courseName.innerText = course.name
    detailBtn.className = "single-course"
    courseInstructor.innerText = course.instructor
    courseSemester.innerText = course.semester
    detailBtn.id = course.id
    detailBtn.innerText = 'Detail'

    courseContainer.appendChild(courseList)
    courseList.appendChild(courseName)
    courseList.appendChild(courseSemester)
    courseList.appendChild(courseInstructor)
    courseList.appendChild(detailBtn)
  })
})//end of fetch

//add addEventListener for detailBtn
courseContainer.addEventListener('click', e=> {
  let clickID = parseInt(e.target.id)
  if (e.target.className == "single-course")
  // console.log(clickID);
  fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/12/courses/${clickID}`)
  .then(res => res.json())
  .then(data => {
    // console.log(courseDetail);
    data.students.map( student => {
      studentArray.push(student)
      // let studentName = document.createElement('li')
      courseDetail.innerHTML += `<div id=${student.id}> ${student.name} </div>`
      // studentName.innerText = student.name
      // courseDetail.appendChild(studentName)
    })
  })//end of fetch
})// end of event addEventListener

// add addEventListener for each student render and edit persentage
courseDetail.addEventListener('click', e=> {
  // console.log(e.target);
  let studenteditName = document.querySelector('#student-name')
  let studentPresentage = document.querySelector('#student-persentage')
  let studentId = parseInt(e.target.id)
  if (e.target.id == studentId) {
    studentArray.map(student => {
    // console.log(student);
    studenteditName.innerText = student.name
    studentPresentage.innerText = student.presentage
    })



  }//end of if statement

})//end of addEventListener

studentInfo.addEventListener('submit', e=> {

  let editinput = document.querySelector('#edit-input')
  fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/12/courses/${studentId}`, {
  method: 'PATCH',
  headers: {
  'Content-Type': 'application/json',
   'Accept': 'application/json'
  },
  body: JSON.stringify({
   percentage: null
  })
  })//end of fetch})
} console.log(typeof(studentId));



// function renderStuendt(student) {
//   return studentInfo.innerHTML = `<form>
//           Name: ${student.name}<br>
//           persentage:<br>
//           <input type="text" name="percentage" value=""><br><br>
//           <input type="submit" value="Submit">
//           </form>`
// }
