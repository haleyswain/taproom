import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <h1>Tap Room</h1>
      <div class="kegs">
        <div [class]="kegStrength(keg)" *ngFor="let keg of kegs">
          <h3>{{keg.name}}</h3>
          <h5>{{keg.brand}}</h5>
          <h5 [class]="getKegColor(keg)">{{keg.pints}} pints remaining</h5>
          <p>Alc. {{keg.alcoholContent}}</p>
          <p [class]="getKegPriceColor(keg.price)">\${{keg.price}}/keg</p>
          <button class="btn btn-info edit" (click)="showEditKegForm(keg)">Edit</button>
          <button class="btn btn-success" (click)="pintPour(keg)">Sell Pint</button>
        </div>
      </div>
      <hr>
      <div class="edit-keg" *ngIf="currentKeg">
        <h4>Edit Keg</h4>
        <div class="form-group">
          <label htmlFor="edit-keg-name">Name</label>
          <input type="text" class="form-control"
                [(ngModel)]="currentKeg.name" id="edit-keg-name"/>
        </div>
        <div class="form-group">
          <label htmlFor="edit-keg-brand">Brand</label>
          <input type="text" class="form-control"
                [(ngModel)]="currentKeg.brand" id="edit-keg-brand"/>
        </div>
        <div class="form-group">
          <label htmlFor="edit-keg-price">Price</label>
          <input type="text" class="form-control"
                [(ngModel)]="currentKeg.price" id="edit-keg-price"/>
        </div>
        <div class="form-group">
          <label htmlFor="edit-keg-alcohol-content">Alcohol Content</label>
          <input type="text" class="form-control"
                [(ngModel)]="currentKeg.alcoholContent" id="edit-keg-alcohol-content"/>
        </div>
        <button class="btn btn-warning" (click)="closeEditKegForm()">Close Edit Form</button>
      </div>
      <hr>
      <button class="btn btn-success" (click)="showNewKegForm()">Add New Keg</button>
      <div class="new-keg" *ngIf="newKeg">
        <h4>New Keg</h4>
        <div class="form-group">
          <label htmlFor="new-keg-name">Name</label>
          <input type="text" class="form-control" [(ngModel)]="newKeg.name" id="new-keg-name"/>
        </div>
        <div class="form-group">
          <label htmlFor="new-keg-brand">Brand</label>
          <input type="text" class="form-control" [(ngModel)]="newKeg.brand" id="new-keg-brand"/>
        </div>
        <div class="form-group">
          <label htmlFor="new-keg-price">Price</label>
          <input type="text" class="form-control" [(ngModel)]="newKeg.price" id="new-keg-price"/>
        </div>
        <div class="form-group">
          <label htmlFor="new-keg-alcohol-content">Alcohol Content</label>
          <input type="text" class="form-control" [(ngModel)]="newKeg.alcoholContent" id="new-keg-alcohol-content"/>
        </div>
        <button class="btn btn-info" (click)="saveNewKeg(newKeg)">Save</button>
      </div>

      <hr>
      <h6>New Keg Data:</h6>
      <code><pre>{{newKeg | json}}</pre></code>
      <h6>Kegs Data:</h6>
      <code><pre>{{kegs | json}}</pre></code>
    </div>
  `
})

export class AppComponent {
  kegs: Keg[] = [
    new Keg("Coldsmoke", "Big Sky Brewing", 100, 6),
    new Keg("Hazelnut Ale", "Rogue Brewery", 110, 15),
    new Keg("Summer Honey", "Kettlehouse Brewing", 120, 7)
  ]
  newKeg = null;
  currentKeg = null;

  showNewKegForm() {
    this.newKeg = {};
  }

  saveNewKeg(params) {
    let keg = new Keg(params.name, params.brand, params.price, params.alcoholContent);
    this.kegs.push(keg);
    this.newKeg = null;
  }

  showEditKegForm(keg) {
    this.currentKeg = keg;
  }
  closeEditKegForm() {
    this.currentKeg = null;
  }

  pintPour(keg) {
    keg.pints -= 1;
  }

  getKegColor(keg) {
    return keg.pints < 10 ? "red" : "";
  }
  getKegPriceColor(price) {
    return price >= 120 ? "red" : price > 100 ? "blue" : "green";
  }

  kegStrength(keg) {
    return keg.alcoholContent > 10 ? "bold" : ""
  }
}

export class Keg {
  pints: number = 12;
  constructor(
    public name: string,
    public brand: string,
    public price: number,
    public alcoholContent: number
  ) {};
}
