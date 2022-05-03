import { Component, OnInit } from '@angular/core';
import { aboutMe, resources } from 'src/app/shared/LocalData/BrandData';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  selfImg = resources.primary;
  aboutMeText = aboutMe;

  constructor() { }

  ngOnInit(): void {
  }

}
