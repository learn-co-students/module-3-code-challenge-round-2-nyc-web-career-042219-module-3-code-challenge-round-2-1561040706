document.addEventListener("DOMContentLoaded", function() {
  console.log("content loaded");

  const courseContainer = document.querySelector("#course-container")
  const courseDetail = document.querySelector("#course-detail")
  const studentUlTag = document.querySelector("#student-list-tag")
  const studentForm = document.querySelector("#student-form")

  let studentArray = []

  fetch("https://warm-shore-17060.herokuapp.com/api/v1/users/9/courses/")
  .then(response => response.json())
  .then(data => {
    console.log((data))
    displayData(data)

  })

  function displayData(arg) {

    arg.forEach(element => {

      courseContainer.innerHTML +=
      `
      <ul>
      <li> ${element.instructor}</li>
      <li> ${element.name}</li>
      <li> ${element.semester} </li>
      <button class="button" data-id="${element.id}" type="button"> See Detail</button>
      <ul>
      `
    })// close of for each

  } // close of function

  courseContainer.addEventListener("click", element => {
    event.preventDefault()
    let fetchID;

    if (event.target.className === "button") {

      fetchID = parseInt(event.target.dataset.id)
      //console.log(fetchID);


      fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/9/courses/${fetchID}`)
      .then(response => response.json())
      .then(data => {
        studentArray = data["students"]
        console.log(studentArray);
        displayStudents(data["students"])
      }) // close of fetch


      function displayStudents(arg) {
        arg.forEach(element => {

          studentUlTag.innerHTML += `
          <li id="${element.id}" class="liTag"> ${element.name} </li>
          `
        }) // close of iterator/forEach
      } // close of display function


    } // close of conditional

  }) // close of event listener

  studentUlTag.addEventListener("click", event => {
    event.preventDefault()
    //console.log(parseInt(event.target.id));

      let studentId;

    if (event.target.className === "liTag") {
       studentId = parseInt(event.target.id)

      studentForm.innerHTML = `
      <form>
        Name :
        <br><br>
        Class Year:
        <br><br>
        Percentage:
        <br><br>
        <input type="text" >
        <br>

        <br><br>
        <input type="submit" value="Submit">
      </form>
      `

      let input = document.querySelector()


    } //
      fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/1/students/${studentId}`, { method:

        'PATCH',
        headers: {
           'Content-Type': 'application/json',
           'Accept':'application/json'
       },
       body: JSON.stringify({
         percentage: ${input.value}
       }) // close of body
      })

    }





  }) //close of UL tag event listener





}); // end of dom content
