import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductosService } from 'src/app/services/productos/productos.service'; 
import { Productos } from 'src/app/interfaces/productos.interfacec'; 
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public nombreProducto:Productos = new Productos();
  public submitted:boolean = false;
  public productName!: FormGroup;
  public getProduct:any = [];

  displayedColumns: string[] = [
    'id',
    'nombre'
  ]
  dataSource = new MatTableDataSource();
  data:any[] = [];

  @ViewChild(MatPaginator,{static:true}) 
  paginator !: MatPaginator;
  
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(private prodService:ProductosService, public fb:FormBuilder) { }

  ngOnInit(): void {
    this.loadP();
    this.productName = this.fb.group({
      nombre: ['', Validators.required]
    })
  }

  get valid(){return this.productName.controls}

  loadP():void{
    this.prodService.productosGet().subscribe(res => {
      this.dataPget(res)
    })
  }

  dataPget(data:any = []):void{
    for(let i of data){
      this.getProduct.push({
        id:i.idProducto,
        nombre:i.nombre,
        
      })
    }
    console.log(this.getProduct)
    this.dataSource = new MatTableDataSource(this.getProduct);
    this.dataSource.paginator = this.paginator;
  }

  onCreateProduct(data:any):void{
    this.prodService.postNombreP(data).subscribe((res) => {
      this.getProduct = [];
      this.notificacionPost(res);
      this.loadP();
      console.log(res)
    })
  }

  notificacionPost(data:any):void{
    if(data.msg == "Guardado"){
       Swal.fire({
        position:'center',
        icon:'success',
          title:'Se guardo correctamente',
          showConfirmButton: true
      })
      
    }else{
      Swal.fire({
        position:'center',
        icon:'error',
          title:'Ocurrio un error',
          showConfirmButton: true
      })
    }
  }

  
}
