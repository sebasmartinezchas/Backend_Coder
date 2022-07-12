
class Usuario{
    constructor(nombre,apellido,libros,mascotas){
      this.nombre=nombre;
      this.apellido=apellido;
      this.libros=libros;
      this.mascotas=mascotas;
      this.nombresADevolver=[];
    }
    getFullname(){
      return console.log(`El usuario se llama ${this.nombre} y su apellido es ${this.apellido}`);
    }
    addMascota(nombreMascota){
      this.mascotas.push(nombreMascota);
  
    }
    countMascotas(){
      return console.log(`El usuario cuenta con ${this.mascotas.length} Mascotas`);
    }
    addBook(libro){
      this.libros.push(libro);
    }
    getBookNames(){
      this.libros.forEach((libro)=>{
        this.nombresADevolver.push(libro.nombre);
      })
      console.log(this.nombresADevolver);
    }
  }
  let usuarioA=new Usuario(
    'Sebastian','Martinez',
  
  [
    {nombre:'Historia Universal de la Infamia',autor:'Jorge Luis Borges'},
    {nombre:'Rayuela',autor:'Julio Cortazar'},
  ],
  ['Perro','Gato']
  );
  usuarioA.getFullname();
  usuarioA.addMascota('Canario');
  usuarioA.countMascotas();
  usuarioA.addBook({nombre:'Sobre héroes y Tumbas',autor:'Ernesto Sabato'});
  usuarioA.getBookNames();