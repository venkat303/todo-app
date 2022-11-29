const category_list = ['work','school','personal','home','other'];
//This will add background color to the category element , color varies from category to category
$(document).ready(function(){
    let categories = document.getElementsByClassName('catsec');
    console.log(categories);
    for(let i=0;i<categories.length;i++){   
        console.log(categories[i].innerHTML,category_list);
        if(categories[i].innerHTML.trim() == 'Work'){
            categories[i].classList.add(category_list[0]);
        }else if(categories[i].innerHTML.trim() == 'School'){
            categories[i].classList.add(category_list[1]);
        }else if(categories[i].innerHTML.trim() == 'Personal'){
            categories[i].classList.add(category_list[2]);
        }else if(categories[i].innerHTML.trim() == 'Home'){
            categories[i].classList.add(category_list[3]);
        }else if(categories[i].innerHTML.trim() == 'Other'){
            categories[i].classList.add(category_list[4]);
        }
    }
})
/*This function is used to toggle the checkbox , it will mark checkbox as checked if it is not and vice versa.
If it is checked a line will go through descritpion of the task*/
function toggleTask(){
    let checkbox_list = document.querySelectorAll('.checkbox');
    let disc_list = document.querySelectorAll('.catsec');
    for(let i=0;i<disc_list.length;i++){
        if(checkbox_list[i].checked == true){
            document.getElementById(checkbox_list[i].getAttribute('task-id')).style.textDecoration='line-through';
        }else if(checkbox_list[i].checked == false){
            document.getElementById(checkbox_list[i].getAttribute('task-id')).style.textDecoration='none';
        }
    }   
}
//Here we are adding delete option to the delete button on click.
document.getElementById('delete').addEventListener('click',function(e){
    e.preventDefault(); // Here are we are preveentng the default function it has.
    const checked_list = document.querySelectorAll('.checkbox:checked');
    let delete_list = [];

    for(let i of checked_list){
        let checked_task = '';
        checked_task=i.getAttribute('task-id');
        delete_list.push(checked_task);
    }
    console.log("abcd :"+delete_list);
    if(delete_list.length==0){ // checking if array is null
        console.log('no item is checked')
        alert("No item is checked!, please select item to remove"); // using alert to show if there is no items in the array
        return;
    }
    //If delete-list is not empty we are sending the post request using AJAX.
    $.ajax({
        type: 'post',
        url: '/delete-task/?id='+delete_list,
        success: function(){
            window.location = '/';
        },
        error: function(err){
          console.log(err);  
        }
    });
})