 const full=document.querySelector("#full");
 const email=document.querySelector("#email");
 const sub=document.querySelector("#sub");
 const mes=document.querySelector("#mes");
function sentemail(){

    const myMessage=`Full Name:${full.value}<br/>
        Email :${email.value}<br/>
        Subject :${sub.value}<br/>
        Message:${mes.value}`;
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "govindanjana2004@gmail.com",
            Password : "1B0A305C93219D77F7BA0C8AC1C1664493E9",
            To : 'govindanjana2004@gmail.com',
            From : "govindanjana2004@gmail.com",
            Subject :"This is the subject",
            Body : myMessage
        }).then(
          message => {
            if(message=="OK"){
                Swal.fire({
          title: "Success!",
          text: "Message Sent Successfully!",
          icon: "success"
        })
            }
          }
          )      
}

let sections =document.querySelectorAll('section');
let navlink =document.querySelectorAll('ul li a');
window.onscroll =()=>{
    // console.log("run");
    
    sections.forEach(sec=>{
        let top= window.scrollY;
        let offset=sec.offsetTop-200;
        let height=sec.offsetHeight;
        let id=sec.getAttribute('id');

        if(top>=offset && top<offset +height){
            navlink.forEach(links => {
                links.classList.remove('active');
            })
               const  g= document.querySelector(`ul li a[href='#${id}']`).classList.add('active');
                     
        }
        
    })
}
