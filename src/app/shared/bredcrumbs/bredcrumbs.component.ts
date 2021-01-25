import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {filter, map } from 'rxjs/operators';



@Component({
  selector: 'app-bredcrumbs',
  templateUrl: './bredcrumbs.component.html',
  styleUrls: ['./bredcrumbs.component.css']
})
export class BredcrumbsComponent implements OnInit {

  title: string;

  constructor(private router: Router,
              private titlebrowser: Title) {

    this.getBreadCrumbs().
    subscribe(
      res => {
      this.title = res.titulo;
      this.titlebrowser.setTitle(this.title);

    })
   }

  ngOnInit(): void {

  }

  getBreadCrumbs(){
   return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd ) => evento.snapshot.firstChild == null ),
      map ( (evento: ActivationEnd ) => evento.snapshot.data )
    )
  }


}
