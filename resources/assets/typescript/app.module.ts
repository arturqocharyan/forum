///<reference path="../../../typings/index.d.ts"/>
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { AppComponent }   from './app.component';
import { SocialComponent } from './component/social/social.component'
@NgModule({
  imports:      [ BrowserModule ,
                  RouterModule.forRoot([
                  {
                    path: 'login',
                    component: SocialComponent
                  }
                ])
  ],
  declarations: [ AppComponent, SocialComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }