console.log('TODO...');
function students(){

    let studentData = document.getElementsByTagName("tbody")[0];//get the fiel that the results will render to    
    studentData.id = "studentsList";//create an id for tbody
    document.getElementById("studentsList").textContent = "";//set the tbody in html to ""

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://students-69f7f-default-rtdb.firebaseio.com/.json", requestOptions)//get the object from firebase which acts as our server
        .then(response => response.json())
        .then(result => {
        let objArr = [];
        for(let list in result){//loop through the student objects so we can extract the info
            let student = {
                key: list,
                id: Number(result[list].addId),
                firstName: result[list].addFirstName,
                lastName: result[list].addLastName,
                facultyNum: result[list].addFacNum,
                grade: result[list].addGrade,
            };
            objArr.push(student);//push object into empty array so we can sort them
        }
        objArr.sort((a, b) => (a.id > b.id) ? 1 : -1);//sort student id in ascending order
        // console.log(objArr)

        for(let i = 0; i < objArr.length; i++){//loop through array and render student info to the DOM
            // console.log(objArr[i]);
            let newTableRow = document.createElement("tr");//create table row
            let id = objArr[i].id;
            let firstName = objArr[i].firstName;
            let lastName = objArr[i].lastName;
            let facultyNum = objArr[i].facultyNum;
            let grade = objArr[i].grade;
            newTableRow.innerHTML = `
                <tr>
                    <td>${id}</td>
                    <td>${firstName}</td>
                    <td>${lastName}</td>
                    <td>${facultyNum}</td>
                    <td>${grade}</td>
                </tr>`;
            studentData.append(newTableRow);//append our new student object to the DOM
        }
        })
        .catch(error => {
            throw error;
        });
}
students();

async function createStudent(){
    console.log("add student function fired");
    // get input values from add student form = insert into json object
    let addId = document.getElementById("id").value;
    let addFirstName = document.getElementById("fname").value;
    let addLastName = document.getElementById("lname").value;
    let addFacNum = document.getElementById("facNum").value;
    let addGrade = document.getElementById("grade").value;
    // add student values to object
    
    let newStudent = {//create new student object
        addId:`${addId}`,
        addFirstName:`${addFirstName}`,
        addLastName:`${addLastName}`,
        addFacNum:`${addFacNum}`,
        addGrade:`${addGrade}`
    };   

    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
    };
    let response = await fetch('https://students-69f7f-default-rtdb.firebaseio.com/.json',settings);
    console.log("response received");
    let result = await response.json();
    // console.log(result);
    if(response.ok){
        console.log("success");         
        students(); 
    //or throw an error via alert box
    }else{
        alert(`Could Not Add Student: ${response.statusText}`);
    }
          
}
