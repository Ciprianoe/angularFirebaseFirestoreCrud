import { Component,OnInit  } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent {
    empleados: any[]=[];
 
  constructor(private _empleadoService:EmpleadoService, private toastr: ToastrService){
    
  }

  ngOnInit():void{
      this._empleadoService.getEmpleados().subscribe(empleados => {
        this.empleados = empleados;
        empleados.forEach((element:any)=>{          
          //console.log(this.empleados);
        })
      //this.empleados = empleados;
      //console.log(this.empleados);
    })
  }
 
  async eliminarEmpleado(empleadoId:any){
    const response =await this._empleadoService.eliminarEmpleado(empleadoId);
    this.toastr.error('Usuario Eliminado Sactifactoriamente','Empleado Borrado');
    console.log(empleadoId);
  }



 /*  async onClickDelete(place: Place) {
    const response = await this.placesService.deletePlace(place);
    console.log(response);
  } */

}
