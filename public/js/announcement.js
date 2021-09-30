document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetch('/announcement/current').then(res => res.json())
    console.log(data)

    var container = document.querySelector('.announcement-container')
    // console.log(container)

    data.allAnnouncement.forEach(element => {

        var parentDiv = document.createElement('div');

        var title = document.createElement('div');
        title.innerHTML = `${element.title}`

        var department = document.createElement('div');
        department.innerHTML = `${element.department}`

        var postedBy_name = document.createElement('div');
        postedBy_name.innerHTML = `${element.postedBy[0].name}`

        var content = document.createElement('div');
        content.innerHTML = `${element.content}`

        var dateDiv = document.createElement('div');
        dateDiv.innerHTML = `${Date(element.date).toString()}`

        parentDiv.appendChild(title);
        parentDiv.appendChild(department);
        parentDiv.appendChild(postedBy_name);
        parentDiv.appendChild(dateDiv);
        parentDiv.appendChild(content);
        // parentDiv.style.border='1px solid black'
        parentDiv.setAttribute('class', 'announcement-box');

        container.appendChild(parentDiv)

    });
})