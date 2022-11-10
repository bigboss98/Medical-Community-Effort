import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Structure, fromJson } from '../model';
import { AlertController, ModalController } from '@ionic/angular';
import { NewStructureComponent } from './newStructure.component';

@Component({
  selector: 'structure',
  templateUrl: './structure.page.html',
  styleUrls: ['./structure.page.scss'],
})
export class StructurePage{
  structures: Structure[];
  filteredList: Structure[];
  numElCurrentSearch: number; 
  
  constructor(private activatedRoute: ActivatedRoute,
              private api: HttpClient,
              private modalCtrl: ModalController) {
    this.structures = []
    }
  
  protected ionViewDidEnter() { 
    let headers: any = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    this.api.get('http://localhost:8000/structures', {headers: headers}).subscribe(data => {
      console.log(Object.keys(data).length);
      for (let index=0; index < Object.keys(data).length; index++) {
        this.structures.push(JSON.parse(data[index]))
      }
  
      this.filteredList = this.structures;
      this.filteredList.sort((el1, el2) => {
        if (el1.advertiser < el2.advertiser) return 1;
        if (el1.advertiser > el2.advertiser) return -1;
        return 0;
      })
      this.numElCurrentSearch = this.filteredList.length;
    }, err => {
      console.log(err);
    }
    );

  }

    /**
   * Close the section page and go to Dashboard page
   */
  close(): void {
    
  }

  async newStructure(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: NewStructureComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    let headers: any = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    console.log(data);
    const structure: Structure = {name: data.name, city: data.city, region: data.region, phone_number: data.phone_number, advertiser: data.advertiser, exams_name: []};
    this.structures.push(structure)
    this.api.post('http://localhost:8000/structures/' + structure.name, JSON.stringify(structure), {headers: headers}).subscribe(data => {
      this.filteredList = this.structures;
      this.filteredList.sort((el1, el2) => {
        if (el1.advertiser < el2.advertiser) return 1;
        if (el1.advertiser > el2.advertiser) return -1;
        return 0;
      })
      this.numElCurrentSearch = this.filteredList.length;
    })

  }

  /**
   * Search users to approve that match user's search preferences
   * @param toSearch(string): String where to filter results
   */
  private search(toSearch?: string) {
    toSearch = toSearch ? toSearch.toLowerCase() : '';
    // filter based on the main fields of the items and paginate
    this.filteredList = this.structures.filter(structure =>
      toSearch.split(' ').every(searchTerm => {
          [structure.city,
           structure.region].filter(f => f).some(f => f.toLowerCase().includes(searchTerm))
 
          }
        )
    );
    const examList = this.structures.filter(structure =>
      toSearch.split(' ').every(searchTerm => {
          return structure.exams_name.filter(f => f.toLowerCase().includes(searchTerm)).length > 0;
        })
    );
  
    this.filteredList = [...examList, ...this.filteredList];
    this.filteredList.sort((el1, el2) => {
      if (el1.advertiser < el2.advertiser) return 1;
      if (el1.advertiser > el2.advertiser) return -1;
      return 0;
    })
    this.numElCurrentSearch = this.filteredList.length;
  }
  /**
   * Filter function to filter users to approve based on user search input
   * @param event(any): event handler where we can obtain search input
   */
  filter(event: any){
    this.search(event.target ? event.target.value : '');
  }

  protected deleteStructure(structure: Structure) {
    this.structures.splice(this.structures.indexOf(structure), 1)
    let headers: any = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    this.api.delete('http://localhost:8000/structures/' + structure.name, {headers: headers, body: JSON.stringify(structure)}).subscribe(data => {
      this.filteredList = this.structures;
      this.numElCurrentSearch = this.filteredList.length;
    })

  }
}
