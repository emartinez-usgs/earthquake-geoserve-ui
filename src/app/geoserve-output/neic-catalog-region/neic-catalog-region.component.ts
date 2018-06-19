import { Component, OnInit } from '@angular/core';

import { RegionsService } from 'location-input';

@Component({
  selector: 'app-neic-catalog-region',
  templateUrl: './neic-catalog-region.component.html',
  styleUrls: ['./neic-catalog-region.component.css']
})
export class NeicCatalogRegionComponent implements OnInit {

  constructor (public readonly regionsService: RegionsService) { }

  ngOnInit() {
  }

}
