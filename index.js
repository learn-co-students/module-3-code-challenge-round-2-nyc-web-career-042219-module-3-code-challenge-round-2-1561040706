document.addEventListener("DOMContentLoaded", function() {
 // console.log('in the DOM');
const userId = 8

const allCoursesUrl = `https://warm-shore-17060.herokuapp.com/api/v1/users/${userId}/courses`
const courseUrl = `https://warm-shore-17060.herokuapp.com/api/v1/users/${userId}/courses/:id` // need to add course id
const studentUrl = `https://warm-shore-17060.herokuapp.com/api/v1/users/1/students/:id` // need to add student id

/// DOM Elements ///
const courseContainer = document.querySelector('#course-container')
const courseDetail = document.querySelector('#course-detail')
const studentList = document.querySelector('#student-list')
const studentForm = document.querySelector('#student-form')

// console.log(studentList);


// TO DO As a user, when the page loads I should see a list of courses retrieved from an API on the left hand side of the screen.



// fetch all courses
// ****(function) then invoke
// console.log(courseContainer);
  function fetchCourses(allCoursesUrl){
    fetch(allCoursesUrl)
    .then(response => response.json())
    .then(courseData =>
      // courseData.forEach(course => console.log(course))
        courseData.forEach(course =>
            renderCourse(course)
        )
    ) // end of fetch

  } // end of function to fetch


  function renderCourse(course){
    courseContainer.innerHTML += `
      <div data-id=${course.id}
      <h3>${course.name}</h3>
      <h3>${course.instructor}</h3>
      <h3>${course.semester}</h3>
      <button data-id=${course.id} class="edit" type="button">See Detail</button>
      </div>

    `
  }



fetchCourses(allCoursesUrl)



// TO DO As a user, when I click the See Detail button, the application should reveal more information about that particular class.

// listen for a click on the course-container
  courseContainer.addEventListener('click', e=> {
    // console.log('click', e.target);

    if (e.target.className === 'edit'){
      console.log('clicked the edit', e.target.dataset.id);

      const selectedCourseId = parseInt(e.target.dataset.id)

      fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/${userId}/courses/${selectedCourseId}`)
      .then(response => response.json())
      .then(courseData =>
          // console.log(courseData.students)
        courseData.students.forEach(student =>
          studentList.innerHTML += `
          <li data-id="${student.id}" class="name">${student.name}</li>
          `
        )
      )
    } // end of conditional

  }) // end of event addEventListener

studentList.addEventListener('click', e =>{
  // console.log('clicked a student', e.target);
  const studentId =  parseInt(e.target.dataset.id)
  if(e.target.className === 'name'){
    fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/${userId}/students/${student.id}`)
    .then(response => response.json())
    .then(studentData =>
      console.log(studentData)

      // ran out of time but in here I would append to the studentForm.innerHTML the info of the student along, similar to how it was done with the course Detail, or tiny form with a input and button as well. the input will have interpolated the student id to use for the patch

    )


  }

})



// TO DO As a user, when looking at the details of a course. I can edit a student's percentage. Clicking the 'Edit' button will save any changes added to the description in the database

// did have time to make a patch request but i can do this 100%. create an addEventListener for the studentForm for a SUBMIT. grab the values of the studentForm, you can access inputs of a form like an array. studentform[0].value set it to a variable. fetch method PATCH use the variable in the body of the patch

});
