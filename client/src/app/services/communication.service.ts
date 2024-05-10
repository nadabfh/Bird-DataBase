import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject} from "rxjs";
import { BirdSpecies } from "../../../../common/tables/BirdSpecies";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = 'http://localhost:3000/database/birds';
  public constructor(private readonly http: HttpClient) {}

  private dataSource = new BehaviorSubject<any>(null);
  currentData = this.dataSource.asObservable();
  
  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  getBirds(): Observable<BirdSpecies[]> {
    return this.http.get<BirdSpecies[]>( this.BASE_URL );
  }

  getBirdsNullPredator(): Observable<BirdSpecies[]> {
    return this.http.get<BirdSpecies[]>( this.BASE_URL + "/nullpredator" );
  }

  deleteBird(nomscientifique: string): Observable<BirdSpecies> {
    console.log("deleteBirds");
    return this.http.delete<BirdSpecies>(this.BASE_URL + "/" + nomscientifique);
  }

  createBird(bird: BirdSpecies): Observable<BirdSpecies> {
    console.log("createBirds");
    return this.http.post<BirdSpecies>(this.BASE_URL + "/insert", bird);
  }

  updateBird(nomscientifique: string, bird: BirdSpecies): Observable<number> {
    return this.http.put<number>(this.BASE_URL + "/update/" + nomscientifique, bird)
  }

  changeData(data: any) {
    this.dataSource.next(data);
  }
  }

