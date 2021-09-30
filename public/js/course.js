document.addEventListener('DOMContentLoaded', async () => {
    var data = await fetch('/user/getcourses').then(res => res.json())
    console.log(data)
    if (data.data.length > 0) {
        var containerGrid = document.querySelector('.grid-container')
        // assuming to be no error
        var indexDivTitle = document.createElement('div')
        indexDivTitle.setAttribute('class', 'grid-item header-row')
        indexDivTitle.innerHTML = `
            S. No.
        `
        containerGrid.appendChild(indexDivTitle)

        var idDivTitle = document.createElement('div')
        idDivTitle.setAttribute('class', 'grid-item header-row')
        idDivTitle.innerHTML = `
            Course ID
        `
        containerGrid.appendChild(idDivTitle)


        var nameDivTitle = document.createElement('div')
        nameDivTitle.setAttribute('class', 'grid-item header-row')
        nameDivTitle.innerHTML = `
            Course Name
        `
        containerGrid.appendChild(nameDivTitle)

        var departmentDivTitle = document.createElement('div')
        departmentDivTitle.setAttribute('class', 'grid-item header-row')
        departmentDivTitle.innerHTML = `
            Department
        `
        containerGrid.appendChild(departmentDivTitle)

        var facultyDivTitle = document.createElement('div')
        facultyDivTitle.setAttribute('class', 'grid-item header-row')
        facultyDivTitle.innerHTML = `Faculty`
        containerGrid.appendChild(facultyDivTitle)

        var prerequisitesDivTitle = document.createElement('div')
        prerequisitesDivTitle.setAttribute('class', 'grid-item header-row')
        prerequisitesDivTitle.innerHTML = `Prerequisites`
        containerGrid.appendChild(prerequisitesDivTitle)

        var remainingSeatsDivTitle = document.createElement('div')
        remainingSeatsDivTitle.setAttribute('class', 'grid-item header-row')
        remainingSeatsDivTitle.innerHTML = `
            Remaining Seats
        `
        containerGrid.appendChild(remainingSeatsDivTitle)

        data.data.forEach((course, index) => {

            var indexDiv = document.createElement('div')
            indexDiv.setAttribute('class', 'grid-item')
            indexDiv.innerHTML = `
            ${index + 1}
        `
            containerGrid.appendChild(indexDiv)

            var idDiv = document.createElement('div')
            idDiv.setAttribute('class', 'grid-item')
            idDiv.innerHTML = `
            ${course.courseID}
        `
            containerGrid.appendChild(idDiv)


            var nameDiv = document.createElement('div')
            nameDiv.setAttribute('class', 'grid-item')
            nameDiv.innerHTML = `
            ${course.courseName}
        `
            containerGrid.appendChild(nameDiv)

            var departmentDiv = document.createElement('div')
            departmentDiv.setAttribute('class', 'grid-item')
            departmentDiv.innerHTML = `
            ${course.department}
        `
            containerGrid.appendChild(departmentDiv)

            var facultyDiv = document.createElement('div')
            facultyDiv.setAttribute('class', 'grid-item')
            course.faculty.forEach(element => {
                var listElement = document.createElement('p')
                listElement.innerHTML = `
                ${element}
            `
                facultyDiv.appendChild(listElement)
            });
            containerGrid.appendChild(facultyDiv)

            var prerequisitesDiv = document.createElement('div')
            prerequisitesDiv.setAttribute('class', 'grid-item')
            course.prerequisites.forEach(element => {
                var listElement = document.createElement('p')
                listElement.innerHTML = `
                ${element}
            `
                prerequisitesDiv.appendChild(listElement)
            });
            console.log(prerequisitesDiv);
            var content = prerequisitesDiv.innerHTML;
            console.log(content);
            console.log(content.length);
            if (content.length === 0) {
                var noneElement = document.createElement('p');
                noneElement.innerHTML = `None`
                prerequisitesDiv.appendChild(noneElement);
            }
            containerGrid.appendChild(prerequisitesDiv)

            var remainingSeatsDiv = document.createElement('div')
            remainingSeatsDiv.setAttribute('class', 'grid-item')
            remainingSeatsDiv.innerHTML = `
            ${course.remainingSeats}
        `
            containerGrid.appendChild(remainingSeatsDiv)

        });
    }
})