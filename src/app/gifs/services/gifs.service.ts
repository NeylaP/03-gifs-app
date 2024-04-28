import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = 'wDGEiljl6CRN6X6tHk8vNAxPZ9FlCwgb'
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs/';
  constructor(private http: HttpClient) { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

private organizeHistory (tag: string) {
  tag = tag.toLowerCase();
  if( this.tagsHistory.includes(tag)) {
    this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
  }

  this._tagsHistory.unshift(tag);
  this._tagsHistory = this.tagsHistory.slice(0,10);
}

async searchTag(tag: string): Promise<void> {
    if (tag.length){
      this.organizeHistory(tag);
      // fetch('https://api.giphy.com/v1/gifs/search?api_key=wDGEiljl6CRN6X6tHk8vNAxPZ9FlCwgb&q=Hello Kitty&limit=10')
      //   .then(resp => resp.json())
      //   .then(data => console.log(data));
      const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('q', tag)
        .set('limit', '10')
      this.http.get<SearchResponse>(`${this.serviceUrl}search`, {params})
      .subscribe(resp =>{
        this.gifList = resp.data;
      });
    }
  }
}
