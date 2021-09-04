import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Productos } from '../../interfaces/productos.interfacec';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }


  baseUrl:any = environment.baseUrl;

  productosGet():Observable<Productos>{
    return this.http.get<any>(`${this.baseUrl}/module/producto/getProducto.php`).pipe(map(Data => {
      return Data;
    }));
  }


  inventarioPost(data:any):Observable<Productos>{
    return this.http.post<any>(`${this.baseUrl}/module/inventario/inventario.php`,JSON.stringify(data))
    .pipe(map(Data => {
      console.log(Data)
      return Data;
    }))
  }

  getInventario():Observable<Productos>{
    return this.http.get<any>(`${this.baseUrl}/module/inventario/getInventario.php`)
    .pipe(map(Data => {
      return Data;
    }))
  }

  postNombreP(data:any):Observable<Productos>{
    return this.http.post<any>(`${this.baseUrl}/module/producto/postProducto.php`,JSON.stringify(data))
    .pipe(map(Data => {
      console.log(Data)
      return Data;
    }))
  }
}
