import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SpeciesCreationComponent } from "../species-creation/species-creation.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public route: string;

    public constructor(location: Location, router: Router,  public dialog: MatDialog) {
        router.events.subscribe((_val: any) => {
            if (location.path() !== "") {
              this.route = location.path();
            } else {
              this.route = "";
            }
          });
    }

    public readonly title: string = "INF3710 TP4";
    public ngOnInit(): void { }
    openDialog() {
      this.dialog.open(SpeciesCreationComponent, {
        width: '70%',
        height: '70%',
    });

    }
}
