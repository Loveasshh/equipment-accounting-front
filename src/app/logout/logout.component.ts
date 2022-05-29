import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogoutComponent>,
              private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onClose(): void{
    this.dialogRef.close();
  }

  onExit(): void{
    this.token.saveToken("");
    this.router.navigate(['home'])
    this.dialogRef.close()
  }
}
