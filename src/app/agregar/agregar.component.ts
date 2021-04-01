import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

interface Usuario {
  nombre: string;
  apellido:string;
  edad:number;
  correo: string;
  clave: string;
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  soloLetrasProbarArriba(e) {
    var key = e.keyCode || e.which;
    var tecla = String.fromCharCode(key).toLowerCase();
    var letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    var especiales = [8, 37, 39, 46];

    var tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
}

  //Contiene la referencia al objeto con el formulario reactivo

    formularioCreado: FormGroup;
//la Lista de usuarios registrados
listaUsuarios: Array<Usuario>= new Array<Usuario>();

//determina si se desea realizar "Agregar" o "Editar"
esNuevo: boolean=true;

posicionEdicion: number=-1;


//Inyección de dependencias
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void { //Llamar al método para que se cree el formulario
    this.crearFormulario();
  }

  //Método para crear el formulario reactivo

  ///^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/

  crearFormulario(){
    //Usar: formBuilder para crear el formulario
    this.formularioCreado = this.formBuilder.group({nombre:['', Validators.compose([Validators.required, Validators.maxLength(20),Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)])],
    apellido:['',Validators.compose([Validators.required, Validators.maxLength(20),Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)])],
    edad: ['',Validators.compose([Validators.required, Validators.maxLength(2),Validators.pattern(/^[1-9]\d{0,2}$/)])],
  correo:['',Validators.compose([Validators.required, Validators.email, Validators.maxLength(30)])],
  clave:['',Validators.compose([Validators.required,Validators.minLength(6),Validators.pattern(/^[A-Za-z0-9\s]+$/)])],

  });



  }


  agregarBoton(){
    //Obtener los valores ingresados en los controles
    console.log(this.formularioCreado.value);
    //Agregar al ARRAY el registro de usuarios ingresado en el formulario
    this.listaUsuarios.push(this.formularioCreado.value as Usuario);
    //limpiar los campos en los inputs (los controles del formulario)
    this.formularioCreado.reset();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Usuario Creado Correctamente',
      showConfirmButton: false,
      timer: 1500
    })

  }

  //Editar el registro
  editarBoton(){
    //Asignar los datos ingresados en los controles al Array ListaUsuarios Array<Usuario>
    this.listaUsuarios[this.posicionEdicion].nombre = this.formularioCreado.value.nombre;
    this.listaUsuarios[this.posicionEdicion].apellido = this.formularioCreado.value.apellido;
    this.listaUsuarios[this.posicionEdicion].edad = this.formularioCreado.value.edad;
    this.listaUsuarios[this.posicionEdicion].correo = this.formularioCreado.value.correo;
    this.listaUsuarios[this.posicionEdicion].clave = this.formularioCreado.value.clave;
    //resetear el formulario
    this.formularioCreado.reset();
    //Mostrar el botón de agregar
    this.esNuevo=true;
    //cambiar la posición del registro actual a editar
    this.posicionEdicion= -1;
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Usuario Editado Correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  }


  editarUsuarioActual(posicion:number){
    //Editar usuario actual en la posición indicada
    /*
    this.listaUsuarios[posicion].nombre = 'Editar';
    this.listaUsuarios[posicion].correo = 'Editar@gmail.com';
    this.listaUsuarios[posicion].clave = '123456';

    console.log( this.listaUsuarios[posicion].nombre,
      this.listaUsuarios[posicion].correo,
       this.listaUsuarios[posicion].clave)
       */
       //Utilizar el objeto formulario Creado que contiene la referencia al formulario
       // y con el método llamado (setValue) asignar un nuevo valor
       this.formularioCreado.setValue({nombre: this.listaUsuarios[posicion].nombre,
      correo: this.listaUsuarios[posicion].correo,
      apellido: this.listaUsuarios[posicion].apellido,
      edad: this.listaUsuarios[posicion].edad,
    clave: this.listaUsuarios[posicion].clave}
    );
    //asignar a la posición de edición
    this.posicionEdicion = posicion;

    //Ocultar el botón "Agregar" y mostrar el botón "Editar"
    this.esNuevo = false;


  }



//Elimina el Registro Actual
  eliminarUsuarioActual(posicion:number){
    //Eliminar el Registro del Array Lista Usuarios Array
    //this.listaUsuarios.splice(posicion, 1);

    Swal.fire({
      title: 'Seguro que desea eliminar el Registro?',
      //text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listaUsuarios.splice(posicion, 1);
        Swal.fire(
          'Usuario Elimado Correctamente!',

         
        )
      }
    })



   // if(confirm("¿Seguro que desea eliminar el registro?")){
    //  this.listaUsuarios.splice(posicion, 1);
  //}
 // }


}

}
