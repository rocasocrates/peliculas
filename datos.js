
window.onload = function()
{
  
  if (sessionStorage.getItem('nick') && sessionStorage.getItem('pass')) 
  {

    document.getElementsByTagName('span')[0].innerHTML = sessionStorage.getItem('nick');
    document.getElementById('login').id = 'ocultar';
    existeTextoPelicula = document.getElementById('texto');   

    document.getElementById('cerrar').addEventListener('click', function()
    {
      sessionStorage.removeItem('nick');
      sessionStorage.removeItem('pass');
      
    });
   
   
   
  } 
  else
  {
    document.getElementById('login').id = 'mostrar';  
    document.getElementById('cerrar').id = 'ocultar'; 
    document.getElementById('favoritas').id = 'ocultar';  
    document.getElementById('listaf').id = 'ocultar';   
  }
 
 
 
}
function crearTabla(titulo) {
   if(titulo == undefined)
  {
    var titulo = document.getElementById('titulo').value;
  }
   
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://www.omdbapi.com/?apikey=f12ba140&t="+titulo+"&plot=full", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      
     // document.getElementById('pelicula').innerHTML = this.responseText;
     var datos = JSON.parse(this.responseText);
     
      textopelicula = document.getElementById('texto');
      valoracion = document.getElementById('valoracion');
      
      
      // crear añadir a favoritos dinamicamente

        //hay que eliminar si exite nodos en textopelicula
        
        textopelicula.innerHTML = "";
        valoracion.innerHTML = ""; 
        document.getElementsByTagName('img')[0].src = "";

        if (sessionStorage.getItem('nick') && sessionStorage.getItem('pass')) 
  {
     favoritas = document.getElementById('favoritas');
     favoritas.innerHTML = "";
     anadir = document.createElement('button');
     anadir.setAttribute('id', 'anadirf'); 
     textobtn = document.createTextNode("Añadir a favoritos");
     anadir.appendChild(textobtn);
     favoritas.appendChild(anadir);

     var event = document.createEvent('Event');
     event.initEvent('click', true, true);
     anadir.addEventListener('click', function (e) {
      var fila = document.getElementsByTagName('tr')[0];
      var titulo = fila.getElementsByTagName('td')[1].innerHTML;

      localStorage.setItem(titulo, titulo);
      alert("Añadida a favoritos");
    }, false);
    eliminar = document.createElement('button');
    eliminar.setAttribute('id', 'anadirf'); 
    textobtneliminar = document.createTextNode("Eliminar de favoritos");
    eliminar.appendChild(textobtneliminar);
    favoritas.appendChild(eliminar);

    var eventdos = document.createEvent('Event');
    eventdos.initEvent('click', true, true);
    eliminar.addEventListener('click', function (e) {
     var fila = document.getElementsByTagName('tr')[0];
     var titulo = fila.getElementsByTagName('td')[1].innerHTML;

     localStorage.removeItem(titulo);
     alert("Eliminada de favoritos");
   }, false);

  }
       
      tabla = document.createElement('table');
     
     for (var key in datos) {

        switch(key)
        {
          case "Poster":
          document.getElementsByTagName('img')[0].src = datos[key];
          break;
          case 'imdbRating':
          var nota = document.createElement('div');
          nota.setAttribute('id', 'nota');
          var textonota = document.createTextNode(datos[key]);
          nota.appendChild(textonota);
          valoracion.appendChild(nota);
          break;
          case 'imdbVotes':
          var voto = document.createElement('div');
          voto.setAttribute('id', 'voto');
          var textovoto = document.createTextNode(datos[key]+" votos");
          voto.appendChild(textovoto);
          valoracion.appendChild(voto);
          break;
          default: 
          var fila = document.createElement('tr');
          var colum = document.createElement('td');
  
          var clave = document.createTextNode(key);
          colum.appendChild(clave);
          fila.appendChild(colum);
  
          var td = document.createElement('td');
          var valor  = document.createTextNode(datos[key]);
          td.appendChild(valor);
          fila.appendChild(td);
  
          tabla.appendChild(fila);
          break;
        }
       
      
      
     
     }
     textopelicula.appendChild(tabla);
     


      }
    };  
  }
  function mostrarFavoritas()
  {
   
    document.getElementById('texto').innerHTML = "";
    document.getElementById('valoracion').innerHTML = "";
    document.getElementById('favoritas').innerHTML = "";
   reset = document.getElementById('contenedor-imagen');
   reset.getElementsByTagName('img')[0].src = "";
    f = document.getElementById('texto');

    var h1 = document.createElement('h1');
    var textoh1 = document.createTextNode('Lista de favoritos');

    h1.appendChild(textoh1);
    f.appendChild(h1);


    for(var i=0, t=localStorage.length; i < t; i++) 
    {
      //alert(localStorage.length);
      titulo = localStorage.getItem(localStorage.key(i));

      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "http://www.omdbapi.com/?apikey=f12ba140&t="+titulo+"&plot=full", true);
      xhttp.send();
      xhttp.onreadystatechange = function()
       {
          if (this.readyState == 4 && this.status == 200)
          {
          
              // document.getElementById('pelicula').innerHTML = this.responseText;
              datos = JSON.parse(this.responseText);

              key = localStorage.key(i);
              img = document.createElement('img');

              img.setAttribute('src', datos['Poster']);
              img.setAttribute('width', '100px');
              img.setAttribute('height', '150px');
              img.setAttribute('margin', '10px');
              img.setAttribute('id', datos['Title']);
              img.addEventListener('click', function()
              {
                crearTabla(this.id);
              });

              f.appendChild(img);
          
          }
       }
    }

   
  }





 
