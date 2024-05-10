import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../components/home/app.component";
import { SpeciesListComponent } from "../components/species-list/species-list.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: 'species', component: SpeciesListComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
  
 }
