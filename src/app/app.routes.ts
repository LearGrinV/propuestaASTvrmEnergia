import { Routes } from '@angular/router';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { MapasComponent } from './mapas/mapas.component';

export const routes: Routes = [
    { path: '', redirectTo: 'instalaciones', pathMatch: 'full' },
    { path: 'instalaciones' , component: InstalacionesComponent },
    { path: 'mapas', component: MapasComponent}
];
