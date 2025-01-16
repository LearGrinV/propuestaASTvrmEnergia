import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-instalaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instalaciones.component.html',
  styleUrl: './instalaciones.component.css'
})
export class InstalacionesComponent {


  pontones = [
    {
      nombre: 'Wagner 1',
      empresa: 'S.Magallanes 02',
      wIn: Math.round(Math.random() * 100) / 10,
      wOut: Math.round(Math.random() * 100) / 10,
      v: Math.round(Math.random() * 1000) / 10
    },
    {
      nombre: 'Staines 2',
      empresa: 'S.Magallanes XII',
      wIn: Math.round(Math.random() * 100) / 10,
      wOut: Math.round(Math.random() * 100) / 10,
      v: Math.round(Math.random() * 1000) / 10
    },
    {
      nombre: 'Cascada',
      empresa: 'Aquachile 23',
      wIn: Math.round(Math.random() * 100) / 10,
      wOut: Math.round(Math.random() * 100) / 10,
      v: Math.round(Math.random() * 1000) / 10
    },
    {
      nombre: 'Jesus 6',
      empresa: 'Londes 1',
      wIn: Math.round(Math.random() * 100) / 10,
      wOut: Math.round(Math.random() * 100) / 10,
      v: Math.round(Math.random() * 1000) / 10
    },
    {
      nombre: 'Lalanca 2',
      empresa: 'Gala 5',
      wIn: Math.round(Math.random() * 100) / 10,
      wOut: Math.round(Math.random() * 100) / 10,
      v: Math.round(Math.random() * 1000) / 10
    },
    {
      nombre: 'Francisco Norte',
      empresa: 'AquaChile 12',
      wIn: Math.round(Math.random() * 100) / 10,
      wOut: Math.round(Math.random() * 100) / 10,
      v: Math.round(Math.random() * 1000) / 10
    }
  ]

  // Canvas
  bateriaCarga : Chart | null = null
  bateriasEstado : Chart | null = null
  bateriasPie : Chart | null = null
  bateriasLine : Chart | null = null
  bateriaDistribucion : Chart | null = null

  ngOnInit(){
    this.actualizarGraficos()
  }


  actualizarGraficos() {

    const bateriaCanvas = document.getElementById('bateriaCarga') as HTMLCanvasElement;
    if (bateriaCanvas) {
      const ctx = bateriaCanvas.getContext('2d');
      if (ctx) {       
        if (this.bateriaCarga) {
          this.bateriaCarga.destroy();
        }
        this.bateriaCarga  = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['0h', '4h', '8h', '12h', '16h', '20h', '24h'],
            datasets: [
              {
                label: 'Voltaje (0-32V)',
                data: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
                borderColor: '#6366f1',
                tension: 0.1
              },
              {
                label: 'Nivel de Carga (0-100%)',
                data: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
                borderColor: '#22d3ee',
                tension: 0.1
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

    const bateriasEstado = document.getElementById('bateriasEstado') as HTMLCanvasElement;
    if (bateriasEstado) {
      const ctx = bateriasEstado.getContext('2d');
      if (ctx) {
        if (this.bateriasEstado) {
          this.bateriasEstado.destroy();
        }
        this.bateriasEstado  = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['Iluminación', 'Climatización', 'Electrodomésticos', 'Electrónica', 'Pontones', 'Puertas', 'Mallas'],
            datasets: [
              {
                label: 'Consumo ',
                data: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: 'rgba(255, 99, 132, 1)',
                pointBorderWidth: 2
                
              }
            ]
          }
        });
      }
    }

    const bateriasPie = document.getElementById('bateriasPie') as HTMLCanvasElement;
    if (bateriasPie) {
      const ctx = bateriasPie.getContext('2d');
      if (ctx) {
        if (this.bateriasPie) {
        this.bateriasPie.destroy();
      }
      this.bateriasPie  = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Cargador', 'Inverso'],
            datasets: [
              {
                data: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
                // BackgroundColor rgba azul transparente
                backgroundColor: [
                  '#6366f1',
                  '#1e293b',
                  ],
                borderColor: 'black'                
              }
            ]
          }
        });
      }
    }

    // consumo: Math.random() * 10,
    // bateriaVoltaje: Math.random() * 32,
    // bateriaCarga: Math.random() * 100,
    // tipoCarga: Math.random() > 0.5 ? 'Inversa' : 'Cargador'

    const bateriasLine = document.getElementById('bateriasLine') as HTMLCanvasElement;
    if (bateriasLine) {
      const ctx = bateriasLine.getContext('2d');
      if (ctx) {
        if (this.bateriasLine) {
          this.bateriasLine.destroy();
        }
        this.bateriasLine  = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['0h', '4h', '8h', '12h', '16h', '20h', '24h'],
            datasets: [
              {
                label: 'kWh Entregados',
                data: [Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10],
                borderColor: '#6366f1',
                backgroundColor: '#6366f1',
              },
              {
                label: 'kWh Recibidos',
                data: [Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10],
                borderColor: '#22d3ee',
                backgroundColor: '#22d3ee',
              }
            ]
          },
        });
      }
    }

  }
  

}
