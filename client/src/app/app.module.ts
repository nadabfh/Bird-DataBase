import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./components/home/app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpeciesListComponent } from './components/species-list/species-list.component';
import { SpeciesListItemComponent } from './components/species-list-item/species-list-item.component';
import { SpeciesCreationComponent } from './components/species-creation/species-creation.component';
import { SpeciesDetailsComponent } from './components/species-details/species-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeciesListComponent,
    SpeciesListItemComponent,
    SpeciesCreationComponent,
    SpeciesDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [CommunicationService],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
