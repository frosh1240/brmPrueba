import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabComponent } from './pages/tab/tab.component';

const routes: Routes = [
  {path:'',
  component:TabComponent,
  children:[
    {
      path:'home', loadChildren:() => import('./pages/home/home.module').then(m => m.HomeModule)
    },
    {
      path:'productos', loadChildren:() => import('./pages/products/products.module').then(m => m.ProductsModule)
    },
    {
      path:'', redirectTo:'home', pathMatch:'full'
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
