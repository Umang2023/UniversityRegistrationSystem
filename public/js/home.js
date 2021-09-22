function update_student_details()
{
    console.log(document.getElementById('student_name').value)
}

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('student_name').value = 'hi'
})