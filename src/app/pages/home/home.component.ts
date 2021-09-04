import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductosService } from 'src/app/services/productos/productos.service'; 
import { Productos } from 'src/app/interfaces/productos.interfacec'; 

import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[
  ]
})
export class HomeComponent implements OnInit {

  public productosData: Productos = new Productos();
  public articulos:any = [];
  public inventario!:FormGroup;
  public submitted:boolean = false;
  public getInventario:any = [];

  displayedColumns: string[] = [
    'nombre',
    'cantidad',
    'lote',
    'precio',
    'fecha'];

  dataSource = new MatTableDataSource();
  data: any[] = [];
  /* dataSource = new MatTableDataSource<Productos>(this.getInventario); */
  @ViewChild(MatPaginator, {static:true})
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
 
  }
  constructor(private prodService:ProductosService, public fb:FormBuilder) { 
  }


  get valid(){return this.inventario.controls}

  ngOnInit(): void {
    this.load()
    this.getInventarioP();
    this.inventario = this.fb.group({
      id:['', Validators.required],
      cantidad:['', Validators.required],
      lote:['', Validators.required],
      precio:['', Validators.required],
      fecha:['', Validators.required]
    })
  }

  load():void{
    this.prodService.productosGet().subscribe(res =>{
      this.dataGet(res);
    });
  }

  dataGet(data:any = []):void{
    for(let i of data){
      this.articulos.push({
        id:i.idProducto,
        nombre:i.nombre
      })
    }
  }
  onCreateInventario(data:any):void{
    
    this.prodService.inventarioPost(data).subscribe((res) => {
      this.notificacion(res);
      this.articulos= [];
      this.getInventario= [];
      this.load()
      this.getInventarioP();
    })

  }

  notificacion(data:any):void{
    console.log(data.msg)
    if(data.msg == "Guardado"){
      
      Swal.fire({
        position:'center',
        icon:'success',
          title:'Se guardo correctamente',
          showConfirmButton: true
      })
      
    }
  }
  getInventarioP():void{
    this.prodService.getInventario().subscribe(res => {
      this.getDataInv(res);
      console.log(res)
    })
  }

  getDataInv(Data:any):void{
    for(let i of Data){
      this.getInventario.push({
        nombre: i.nombre,
        cantidad: i.cantidad,
        lote: i.nlote,
        precio: i.precio,
        fecha: i.fechaV,
        idInventario: i.idInventario,
        idProducto: i.idProducto
      })
    }

    this.dataSource = new MatTableDataSource(this.getInventario);
    this.dataSource.paginator = this.paginator;

    console.log(this.dataSource.data)
  }
}
