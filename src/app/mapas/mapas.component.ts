import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-mapas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mapas.component.html',
  styleUrl: './mapas.component.css'
})
export class MapasComponent {


  estadoCentro:string = ''      
  indexCentro:number = 0        
  filteredCentros: any[] = [];  
  searchText: string = '';      

  centros:any [] = []
  canvasInstalados: Chart | null = null

  centrosIniciales:any [] = [
    {
      'nombreEmpresa': 'AST NETWORKS',
      'tipoPonton': 'Embarcación',
      'codigo': 'Q3',
      'nombreCentro' : 'Quillaipe',
      'descripcion': 'Centro de prueba',
      'estado': 'Activo'
    },
    {
      'nombreEmpresa': 'Mowi',
      'tipoPonton': 'Modulo habitacional',
      'codigo': 'Q2',
      'nombreCentro' : 'Centro Piren',
      'descripcion': 'Sin descripción',
      'estado': 'Inactivo'
    },
    {
      'nombreEmpresa': 'Mowi',
      'tipoPonton': 'Modulo habitacional',
      'codigo': 'Q3',
      'nombreCentro' : 'Julian',
      'descripcion': 'Sin descripción',
      'estado': 'Inactivo'
    },
    {
      'nombreEmpresa': 'Mowi',
      'tipoPonton': 'Modulo habitacional',
      'codigo': 'Q4',
      'nombreCentro' : 'Isla Lola',
      'descripcion': 'Sin descripción',
      'estado': 'Inactivo'
    },
    {
      'nombreEmpresa': 'Mowi',
      'tipoPonton': 'Modulo habitacional',
      'codigo': 'Q5',
      'nombreCentro' : 'Larenas',
      'descripcion': 'Sin descripción',
      'estado': 'Inactivo'
    },
    {
      'nombreEmpresa': 'Mowi',
      'tipoPonton': 'Modulo habitacional',
      'codigo': 'Q6',
      'nombreCentro' : 'Level',
      'descripcion': 'Sin descripción',
      'estado': 'Inactivo'
    },
    {
      'nombreEmpresa': 'Mowi',
      'tipoPonton': 'Modulo habitacional',
      'codigo': 'Q7',
      'nombreCentro' : 'James',
      'descripcion': 'Sin descripción',
      'estado': 'Inactivo'
    },
    {
      'nombreEmpresa': 'Mowi',
      'tipoPonton': 'Modulo habitacional',
      'codigo': 'Q8',
      'nombreCentro' : 'P.Garcia',
      'descripcion': 'Sin descripción',
      'estado': 'Inactivo'
    },
    {
      'nombreEmpresa': 'Mowi',
      'tipoPonton': 'Modulo habitacional',
      'codigo': '193',
      'nombreCentro' : 'Quitralco 7',
      'descripcion': 'Sin descripción',
      'estado': 'Activo'
    },
    {
      'nombreEmpresa': 'Mowi',
      'tipoPonton': 'Modulo habitacional',
      'codigo': 'Q9',
      'nombreCentro' : 'Pcola',
      'descripcion': 'Sin descripción',
      'estado': 'Inactivo'
    }
  ]

  ngOnInit(){
    this.cargarCentros()
    this.actualizarGraficos()
  }

  currentPage: number = 1; // Página actual
  itemsPerPage: number = 5; // Número de elementos por página

  get totalPages(): number[] {
    return Array(Math.ceil(this.filteredCentros.length / this.itemsPerPage)).fill(0).map((_, i) => i + 1);
  }

  get paginatedCentros() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCentros.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  abrirCambiarEstado(centroEstado:any,index:any){
    document.getElementById('modalConfirmacionEstado')?.classList.replace('hidden','flex')
    this.estadoCentro = centroEstado == 'Activo' ? 'apagar' : 'encender'
    this.indexCentro = index
  }

  cerrarCambiarEstado(){
    document.getElementById('modalConfirmacionEstado')?.classList.replace('flex','hidden')
  }

  cambiarEstado(){
    // Buscamos el centro que se quiere cambiar con this.indexCentro
    const centro = this.centros[this.indexCentro]
    // Cambiamos el estado del centro
    centro.estado = this.estadoCentro == 'apagar' ? 'Inactivo' : 'Activo'
    this.cerrarCambiarEstado()
  }

  abrirEliminarEstado(index:any){
    document.getElementById('modalConfirmacionEliminar')?.classList.replace('hidden','flex')
    this.indexCentro = index
  }

  cerrarEliminarEstado(){
    document.getElementById('modalConfirmacionEliminar')?.classList.replace('flex','hidden')
  }

  cargarCentros(){
    if (this.centros.length === 0) {
      this.guardarCentros();
    } else {
      this.centros = this.centrosIniciales;
      this.filteredCentros = this.centrosIniciales; 
    }
  }

  guardarCentros() {
    this.centros = [...this.centrosIniciales];
    this.filteredCentros = [...this.centrosIniciales]; 
  }

  eliminarCentro(){
    this.centrosIniciales.splice(this.indexCentro, 1)
    this.cerrarEliminarEstado()
  }

  filtrarCentros() {
    this.filteredCentros = this.centros.filter(centro => {
      return (
        centro.nombreEmpresa.toLowerCase().includes(this.searchText.toLowerCase()) ||
        centro.tipoPonton.toLowerCase().includes(this.searchText.toLowerCase()) ||
        centro.codigo.toLowerCase().includes(this.searchText.toLowerCase()) ||
        centro.nombreCentro.toLowerCase().includes(this.searchText.toLowerCase()) ||
        centro.descripcion.toLowerCase().includes(this.searchText.toLowerCase()) ||
        centro.estado.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });

    this.currentPage = 1;
  }

  actualizarGraficos() {
  
      const canvasInstalados = document.getElementById('canvasInstalados') as HTMLCanvasElement;
      if (canvasInstalados) {
        const ctx = canvasInstalados.getContext('2d');
        if (ctx) {       
          if (this.canvasInstalados) {
            this.canvasInstalados.destroy();
          }
          this.canvasInstalados  = new Chart(ctx, {
            type: 'polarArea',
            data: {
              labels: ['Quillaipe', 'Julian', 'Isla Lola', 'Larenas', 'Quitralco 7'],
              datasets: [
                {
                  label: 'Instalaciones',
                  data: [Math.floor(Math.random() * 100) + 1 , Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 100) + 1],
                  borderColor: '#22d3ee',
                }
              ]
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: '#1e293b'
                  }
                },
                x: {
                  grid: {
                    color: '#1e293b'
                  }
                }
              }
      
            }
          });
        }
      }
  }
}
