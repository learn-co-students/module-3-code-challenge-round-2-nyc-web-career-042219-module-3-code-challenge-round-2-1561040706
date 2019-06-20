document.addEventListener("DOMContentLoaded", function() {


const BASE_URL = 'https://warm-shore-17060.herokuapp.com/api/v1/users/7/courses'
const STUDENTS_URL = 'https://warm-shore-17060.herokuapp.com/api/v1/users/7/students'

//----DOM ELEMENTS
const courseContainer = document.querySelector('#course-container');
const courseDetail = document.querySelector('#course-detail');
const studentForm = document.querySelector('#student-form');

//----LOCAL STATE
let courses = [];
let details = [];
let students = [];

//----RENDER METHODS

//----EVENT LISTENERS
courseContainer.addEventListener('click', event => {
  const courseId = parseInt(event.target.dataset.id)
  if (event.target.name === 'button') {
    // console.log(event.target.dataset.id);
    fetch(BASE_URL + `/${courseId}`)
      .then(res => res.json())
      .then(detailsData => {
        details = detailsData;
        details.students.forEach(student => {
          courseDetail.innerHTML += `
          <ul>
          <li class="list" data-id="${student.id}">
          ${student.name} ${student.percentage}
          </li>
          </ul>
          `
        })
      })
  }
})

courseDetail.addEventListener('click', event => {
  const studentId = parseInt(event.target.dataset.id)
      if (event.target.className === 'list') {
        // console.log(event.target.dataset.id)
        fetch(STUDENTS_URL + `/${studentId}`)
        .then(res => res.json())
        .then(studentData => {
          students = studentData;
            studentForm.innerHTML = `
            <p>${students.name}</p>
            <p>${students.class_year}</p>
            <p>${students.percentage}</p>
            <label for='percentage'>Percentage:</label><input type="text" id="edit-percentage" value="${students.percentage}"><button data-id="${students.id}" type="button" name="pct-button">Edit</button>
            `
        })
      }
    })

    studentForm.addEventListener('submit', event => {
      const targetId = parseInt(event.target.dataset.id);
      if (event.target === document.getElementsByName('pct-button')) {
        console.log(event.target.dataset.id)
      }
    })

  //**** 
  //   let percentage = document.querySelector('#edit-percentage').value
  //
  //   fetch(STUDENTS_URL + `/${targetId}`, {
  //   method: 'PATCH',
  //   headers: {'Content-Type': 'application/json',
  //             'Accept': 'application/json'},
  //   body: JSON.stringify ({
  //     percentage: percentage
  //   })
  // })
  // .then(res => res.json())
  // .then(console.log)


//----INITIALIZATION
function fetchCourses() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(coursesData => {
      console.log('initial render:', coursesData);
      courses = coursesData;
      courses.forEach(course => {
        courseContainer.innerHTML += `
        <div class="card" data-id="${course.id}">
        <p><strong>${course.name}</strong></p>
        <p>${course.instructor}</p>
        <p>${course.semester}</p>
        <button data-id="${course.id}" type="button" name="button">See detail</button>
        </div>
        `
      })
    })
}
fetchCourses();

// function fetchDetails() {
//   fetch(`BASE_URL/${course.id}`)
//     .then(res => res.json())
//     .then(detailsData => {
//       console.log(detailsData)
//     })
// }
// fetchDetails();
});//END DOM EVENT LISTENER
