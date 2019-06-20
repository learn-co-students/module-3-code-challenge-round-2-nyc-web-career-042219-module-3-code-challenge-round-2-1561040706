document.addEventListener("DOMContentLoaded", function() {
  console.log("content loaded");

  const courseContainer = document.querySelector("#course-container")
  const courseDetail = document.querySelector("#course-detail")
  const studentUlTag = document.querySelector("#student-list-tag")
  const studentForm = document.querySelector("#student-form")

  let studentList = null;
  let studentId = null;

  fetch("https://warm-shore-17060.herokuapp.com/api/v1/users/9/courses/")
  .then(response => response.json())
  .then(data => {
    //console.log((data))
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
        displayStudents(data["students"])
        studentList = (data.students)
        //console.log(Array.isArray(studentList));
        //console.log(studentArray["students"]);
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



    if (event.target.className === "liTag") {
       studentId = parseInt(event.target.id)

       console.log(Array.isArray(studentList));
       let studentObject = studentList.find(element => {
         return element.id === studentId
       })
       console.log(studentObject);



       //console.log(individualStudent);

      studentForm.innerHTML = `
      <form data-id="${studentObject.name}">
        Name: ${studentObject.name}
        <br><br>
        Class Year: ${studentObject.class_year}
        <br><br>
        Percentage: ${studentObject.percentage}
        <br><br>
        <input id="input-for-grade" type="text" >

        <input  type="submit" value="Submit">
      </form>
      `

    } // conditional close

      //let input = document.querySelector()

      studentForm.addEventListener("submit", event => {
        event.preventDefault()


        let gradeInput = document.querySelector("#input-for-grade")
        //console.log(typeof gradeInput.value);

        fetch(`https://warm-shore-17060.herokuapp.com/api/v1/users/9/students/${studentId}`, { method:

          'PATCH',
          headers: {
             'Content-Type': 'application/json',
             'Accept':'application/json'
         },
         body: JSON.stringify({
           percentage: `${parseInt(gradeInput.value)}`
         }) // close of body
       }) // close of fetch
       .then(response => response.json())
       .then(data => {
         updateFormAndArray(data)
         console.log(data);

       })

       function updateFormAndArray(arg) {

         studentForm.innerHTML = `

         <form data-id="${arg.name}">
           Name: ${arg.name}
           <br><br>
           Class Year: ${arg.class_year}
           <br><br>
           Percentage: ${arg.percentage}
           <br><br>
           <input id="input-for-grade" type="text" >
           <input  type="submit" value="Submit">
         </form>
         `

       }


      })









  }) //close of UL tag event listener





}); // end of dom content
