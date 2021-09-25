function update_student_details()
{
    name = document.getElementById('student_name').value
    fatherName = document.getElementById('student_father_name').value
    motherName = document.getElementById('student_mother_name').value
    branch = document.getElementById('student_branch').value
    yearOfStudy = document.getElementById('student_year_of_study').value
    yearOfAdmission = document.getElementById('student_year_of_admission').value
    dob = document.getElementById('student_date_of_birth').value
    backlog = document.getElementById('student_backlog').value
    // console.log()
    fetch('/user/editDetails',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name,
            fatherName,
            motherName,
            branch,
            yearOfStudy,
            yearOfAdmission,
            dob,
            backlog
        })
    })
    .then(res=>res.json())
    .then((data)=>{
        console.log(data)
        if(!data.isError)
        {
            document.getElementById('student_name').value = data.updatedUser.name
            document.getElementById('student_father_name').value = data.updatedUser.fatherName
            document.getElementById('student_mother_name').value = data.updatedUser.motherName
            document.getElementById('student_branch').value = data.updatedUser.branch
            document.getElementById('student_year_of_study').value = data.updatedUser.yearOfStudy
            document.getElementById('student_year_of_admission').value = data.updatedUser.yearOfAdmission
            document.getElementById('student_date_of_birth').value = new Date(data.updatedUser.dob).toISOString().split('T')[0]
            document.getElementById('student_backlog').value = data.updatedUser.backlog
        }
        
    })
    .catch(err=>{
        console.log(err)
    })
}

async function logout()
{
    await fetch('/user/logout')
    window.location.href = '/signin'
}

document.addEventListener('DOMContentLoaded',async ()=>{
    // document.getElementById('student_name').value = 'hi'
    // console.log(document.cookie)
    // document.cookie = 'username = Vikash'
    var data=await fetch('/user/info').then(res=>res.json())
    console.log(data)
    document.getElementById('student_name').value = data.data.name
    document.getElementById('student_father_name').value = data.data.fatherName
    document.getElementById('student_mother_name').value = data.data.motherName
    document.getElementById('student_branch').value = data.data.branch
    document.getElementById('student_year_of_study').value = data.data.yearOfStudy
    document.getElementById('student_year_of_admission').value = data.data.yearOfAdmission
    document.getElementById('student_backlog').value = data.data.backlog
    document.getElementById('student_date_of_birth').value = new Date(data.data.dob).toISOString().split('T')[0]
})