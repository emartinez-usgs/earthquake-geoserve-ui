import { Component, OnInit } from '@angular/core';

import {
  Region,
  RegionsService
} from 'location-input';

@Component({
  selector: 'app-admin-region',
  templateUrl: './admin-region.component.html',
  styleUrls: ['./admin-region.component.css']
})
export class AdminRegionComponent implements OnInit {

  constructor (public readonly regionsService: RegionsService) { }

  ngOnInit() {
  }
}
