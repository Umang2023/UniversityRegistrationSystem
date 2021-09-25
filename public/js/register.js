document.addEventListener('DOMContentLoaded', async () => {
    console.log("Before")
    var data = await fetch('/course/current').then(res => res.json());
    console.log(data);
    if (data.allCourseDetails.length > 0) {
        var containerGrid = document.querySelector('.grid-container')
        // assuming to be no error
        var indexDivTitle = document.createElement('div')
        indexDivTitle.setAttribute('class', 'grid-item')
        indexDivTitle.innerHTML = `
            S. No.
        `
        containerGrid.appendChild(indexDivTitle)

        var idDivTitle = document.createElement('div')
        idDivTitle.setAttribute('class', 'grid-item')
        idDivTitle.innerHTML = `
            Course ID
        `
        containerGrid.appendChild(idDivTitle)


        var nameDivTitle = document.createElement('div')
        nameDivTitle.setAttribute('class', 'grid-item')
        nameDivTitle.innerHTML = `
            Course Name
        `
        containerGrid.appendChild(nameDivTitle)

        var remainingSeatsDivTitle = document.createElement('div')
        remainingSeatsDivTitle.setAttribute('class', 'grid-item')
        remainingSeatsDivTitle.innerHTML = `
            Remaining Seats
        `
        containerGrid.appendChild(remainingSeatsDivTitle)

        var actionDivTitle = document.createElement('div')
        actionDivTitle.setAttribute('class', 'grid-item')
        actionDivTitle.innerHTML = `
            Action
        `
        containerGrid.appendChild(actionDivTitle)

        data.allCourseDetails.forEach((course, index) => {

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

            var remainingSeatsDiv = document.createElement('div')
            remainingSeatsDiv.setAttribute('class', 'grid-item')
            remainingSeatsDiv.innerHTML = `
            ${course.remainingSeats}
        `
            containerGrid.appendChild(remainingSeatsDiv)

            var actionDiv = document.createElement('div')
            actionDiv.setAttribute('class', 'grid-item')
            var registerButton = document.createElement('button')
            registerButton.innerHTML = 'Register'
            actionDiv.appendChild(registerButton)
            containerGrid.appendChild(actionDiv)
        });

    }
});