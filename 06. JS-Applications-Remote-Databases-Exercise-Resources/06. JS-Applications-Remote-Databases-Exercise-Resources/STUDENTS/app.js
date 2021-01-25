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
            // console.log(result);
            for(let list in result){
                // console.log(result);
                let newTableRow = document.createElement("tr");
                let id = result.students.id;
                let firstName = result.students.firstName;
                let lastName = result.students.lastName;
                let facultyNum = result.students.facultyNumber;
                let grade = result.students.grade;
                newTableRow.innerHTML = `
                    <tr>
                        <td>${id}</td>
                        <td>${firstName}</td>
                        <td>${lastName}</td>
                        <td>${facultyNum}</td>
                        <td>${grade}</td>
                    </tr>`;
                studentData.append(newTableRow);
            }
            
            console.log(result);
        })
        .catch(error => {
            throw error;
        });
        async function addStudent(){
            // get input values from add book form = insert into json object
            let addId = document.getElementById("input")[0].value;
            console.log(addId);
            let addFirstName = document.getElementsByTagName("input")[1].value;
            let addLastName = document.getElementsByTagName("input")[2].value;
            let addFacNum = document.getElementsByTagName("input")[3].value;
            let addGrade = document.getElementsByTagName("input")[4].value;
            console.log("addBooks Fired");
            // add book values to object
            let newStudent = {
                addId:`${addId}`,
                addFirstName:`${addFirstName}`,
                addLastName:`${addLastName}`,
                addFacNum:`${addFacNum}`,
                addGrade:`${addGrade}`
            };
            // console.log(JSON.stringify(newBookObj));
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            };
            try{
                let response = await fetch('https://students-69f7f-default-rtdb.firebaseio.com/.json',settings);
            console.log("response received");
            let result = await response.json();
            console.log("processed response");
            console.log(result);
            }catch(error){
                console.log(error);
            }
        }
}
students();