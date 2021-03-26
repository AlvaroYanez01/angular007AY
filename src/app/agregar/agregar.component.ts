import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Usuario {
  nombre: string;
  correo: string;
  clave: string;
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

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

  crearFormulario(){

    //Usar: formBuilder para crear el formulario
    this.formularioCreado = this.formBuilder.group({nombre:['Alvaro', Validators.required],
  correo:['',Validators.compose([Validators.required, Validators.email])],
  clave:['',Validators.compose([Validators.required,Validators.minLength(6)])]
  });

  }


  agregarBoton(){
    //Obtener los valores ingresados en los controles
    console.log(this.formularioCreado.value);
    //Agregar al ARRAY el registro de usuarios ingresado en el formulario
    this.listaUsuarios.push(this.formularioCreado.value as Usuario);

    //limpiar los campos en los inputs (los controles del formulario)
    this.formularioCreado.reset();

  }

  //Editar el registro
  editarBoton(){

    //Asignar los datos ingresados en los controles al Array ListaUsuarios Array<Usuario>
    this.listaUsuarios[this.posicionEdicion].nombre = this.formularioCreado.value.nombre;
    this.listaUsuarios[this.posicionEdicion].correo = this.formularioCreado.value.correo;
    this.listaUsuarios[this.posicionEdicion].clave = this.formularioCreado.value.clave;

    //resetear el formulario
    this.formularioCreado.reset();

    //Mostrar el botón de agregar
    this.esNuevo=true;

    //cambiar la posición del registro actual a editar
    this.posicionEdicion= -1;


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
    clave: this.listaUsuarios[posicion].clave});


    //asignar a la posición de edición
    this.posicionEdicion = posicion;

    //Ocultar el botón "Agregar" y mostrar el botón "Editar"
    this.esNuevo = false;



  }

//Elimina el Registro Actual
  eliminarUsuarioActual(posicion:number){

    //Eliminar el Registro del Array Lista Usuarios Array

    this.listaUsuarios.splice(posicion, 1);

  }

}
