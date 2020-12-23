console.log('TODO...');
function students(){

    let studentData = document.getElementById("results");
    // console.log(studentData);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://students-69f7f-default-rtdb.firebaseio.com/.json", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            for(let list in result){
                let newTableHeader = document.createElement("th");
                let newDiv = document.createElement("div");
                let id = result.students.id;
                let firstName = result.students.firstName;
                let lastName = result.students.lastName;
                let facultyNum = result.students.facultyNumber;
                let grade = result.students.grade;
                // newDiv.innerHTML = `
                // <thead>
                //     <tr>
                //         <th>${id}</th>
                //         <th>${firstName}</th>
                //         <th>${lastName}</th>
                //         <th>${facultyNum}</th>
                //         <th>${grade}</th>
                //     </tr>
                // </thead>`;
                // newTableHeader.append(newDiv);
            }
            
            // console.log(result);
        })
        .catch(error => {
            throw error;
        });
}
students();