import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `<h5>Buscar:</h5>
  <input type="text"
         class="form-control"
         placeholder="Buscar gifs"
         (keyup.enter)="searchTag()"
         #txtTagInput>`
})

export class SearchBoxComponent{

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>; //El ! indica que nunca será nulo

  constructor(private gifsService: GifsService) { }

  // searchTag(newTag: string){
  searchTag(){
    let newTag = this.tagInput.nativeElement.value;
      this.gifsService.searchTag(newTag);
      this.tagInput.nativeElement.value = '';
  }
}
