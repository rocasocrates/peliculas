window.addEventListener('load', function(){
document.getElementById('login').addEventListener("click", function(){

  
        usuario = document.getElementById('usuario').value;
        pass = document.getElementById('pass').value;
                sessionStorage.setItem('nick', usuario);
                sessionStorage.setItem('pass', pass);

                
   });
}); 