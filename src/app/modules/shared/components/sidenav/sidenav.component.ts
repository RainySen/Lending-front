import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;
  username: any;

  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Userlist", route: "admin/userlist", icon: "list_alt"}
  ]

  constructor(media: MediaMatcher, private keycloackService: KeycloakService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  shouldRun = true;

  ngOnInit(): void {
    /* this.username = this.keycloackService.getUsername() */;
  }

  logout(){
    this.keycloackService.logout();
  }


}
