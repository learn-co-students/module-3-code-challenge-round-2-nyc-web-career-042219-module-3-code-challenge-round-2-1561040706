document.addEventListener("DOMContentLoaded", function() {


const courseContainer = document.querySelector('#course-container')
const detailContainer = document.querySelector('#course-detail')
const studentForm = document.querySelector('#student-form')

//local state
let courses = []
let students = []
//fetch get all courses
fetch('https://warm-shore-17060.herokuapp.com/api/v1/users/6/courses')
  .then(r => r.json())
  .then(data => {
    courses = data
    // console.log(courses);
    renderCourses(courses)
  })

function renderCourses() {
  courses.forEach(course => {
    courseContainer.innerHTML +=
    `
    <ul>
      <p>${course.name}</p>
      <p>${course.instructor}</p>
      <p>${course.semester}</p>
      <button class="detail-button" id="${course.id}" type="button">
        See Details
      </button>
    </ul>
    `
  })
}

courseContainer.addEventListener('click', function(e){
  if (e.target.innerText === "See Details") {
    let courseId = parseInt(e.target.id)

    fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/6/courses/${courseId}`)
      .then(r => r.json())
      .then(data => {
        //i want the students from this SPECIFIC course
        // console.log(data);
        students = data.students
        // console.log(students);
        detailContainer.innerHTML = ""
        students.forEach(student => {
          detailContainer.innerHTML +=
          `
          <li id="${student.id}">${student.name} ${student.percentage}
          </li>
          `
        })//end of forEach

      })
    //reset the detailContainer!!!!
    // console.log(courseId);
  }
})

detailContainer.addEventListener('click', function(e){
  let studentId = parseInt(e.target.id)
  // console.log(studentId);
  let foundStudent = students.find(student => student.id === studentId)
  // console.log(foundStudent);
  studentForm.innerHTML +=
  `
  <ul>
    <p>${foundStudent.name}</p>
    <p>${foundStudent.class_year}</p>
    <p>${foundStudent.percentage}</p>

      Percentage: <input id="myText" type="text" name="percentage"><br>
      <button class="edit-button" id="${foundStudent.id}" type="button">
        Edit
      </button>
  </ul>
  `
})//end of detailContainer listener

//listen for a click
//grab that value --
//patch it up to the db
studentForm.addEventListener('click', function(e){
  if (e.target.innerText === "Edit") {
    // console.log(e.target, "hellll yeaaa");
    // let newPerc =
    let newPer = document.getElementById("myText").value
    let studentId = parseInt(e.target.id)
    //HELL YEA
    console.log(newPer);
    //HELL YEA
    console.log(studentId);
    fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/6/students/${studentId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        percentage: newPer
      })//end of body
    })//end of fetch PATCH
    .then(r => r.json())
    .then(thing => console.log(thing))
    //HELL YEAH patch works, need to rerender info

  }//end of if button innerText
})//end of studentForm listener

});//end of DOMContentLoaded
