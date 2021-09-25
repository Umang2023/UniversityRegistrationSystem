document.addEventListener('DOMContentLoaded',async ()=>{
    var data = await fetch('/user/getcourses').then(res=>res.json())
    console.log(data)
    var containerGrid = document.querySelector('.grid-container')
    // assuming to be no error
    data.data.forEach((course,index) => {

        var indexDiv=document.createElement('div')
        indexDiv.setAttribute('class','grid-item')
        indexDiv.innerHTML=`
            ${index+1}
        `
        containerGrid.appendChild(indexDiv)

        var idDiv=document.createElement('div')
        idDiv.setAttribute('class','grid-item')
        idDiv.innerHTML=`
            ${course.courseID}
        `
        containerGrid.appendChild(idDiv)
        
        
        var nameDiv=document.createElement('div')
        nameDiv.setAttribute('class','grid-item')
        nameDiv.innerHTML=`
            ${course.courseName}
        `
        containerGrid.appendChild(nameDiv)
        
        var departmentDiv=document.createElement('div')
        departmentDiv.setAttribute('class','grid-item')
        departmentDiv.innerHTML=`
            ${course.department}
        `
        containerGrid.appendChild(departmentDiv)

        var facultyDiv=document.createElement('div')
        facultyDiv.setAttribute('class','grid-item')
        course.faculty.forEach(element => {
            var listElement=document.createElement('p')
            listElement.innerHTML=`
                ${element}
            `
            facultyDiv.appendChild(listElement)
        });
        containerGrid.appendChild(facultyDiv)

        var prerequisitesDiv=document.createElement('div')
        prerequisitesDiv.setAttribute('class','grid-item')
        course.prerequisites.forEach(element => {
            var listElement=document.createElement('p')
            listElement.innerHTML=`
                ${element}
            `
            prerequisitesDiv.appendChild(listElement)
        });
        containerGrid.appendChild(prerequisitesDiv)

        var remainingSeatsDiv=document.createElement('div')
        remainingSeatsDiv.setAttribute('class','grid-item')
        remainingSeatsDiv.innerHTML=`
            ${course.remainingSeats}
        `
        containerGrid.appendChild(remainingSeatsDiv)

    });
})