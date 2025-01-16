import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'propuestaASTNETWORK';

  login:boolean = false;

  constructor(private router:Router){}

  ruta(ruta:any){
    // Si la ruta es igual a salir, recargar pagina
    if(ruta == 'salir'){
      window.location.reload();
    }
    
    this.router.navigate(['/']).then(() => {
      this.router.navigate([ruta]);
      });
  }
}
