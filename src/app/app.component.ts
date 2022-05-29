import { Component, OnInit  } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import {MatDialog} from "@angular/material/dialog";
import {LogoutComponent} from "./logout/logout.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  roles!: string[];
  authority!: string;
  username!: string;

  constructor(private tokenStorage: TokenStorageService,
              public dialog: MatDialog) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
      this.username = this.tokenStorage.getUsername();
    }
  }


  logout(): void{
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '375px'
    })
    dialogRef.afterClosed().subscribe(() => {
      window.location.reload()
    })
  }
}
