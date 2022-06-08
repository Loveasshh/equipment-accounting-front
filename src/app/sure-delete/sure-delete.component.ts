import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpInfo } from '../auth/signup-info';
import { NewUserModalComponent } from '../new-user-modal/new-user-modal.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sure-delete',
  templateUrl: './sure-delete.component.html',
  styleUrls: ['./sure-delete.component.css']
})
export class SureDeleteComponent implements OnInit {
  name!: string;
  constructor(public dialogRef: MatDialogRef<NewUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {username : string},
    public snackBar: MatSnackBar, private userService: UserService) {this.name = this.data.username }

  ngOnInit(): void {
    
  }
  onClose(): void{
    this.dialogRef.close();
  }

  onDelete(): void{
    console.log(this.data.username)
    this.userService.deleteUser(this.data.username).subscribe(()=>{
      console.log(this.data.username + "ацуацу");
      this.snackBar.open("Пользователь успешно удален", "", {
        duration: 3000
      });
      this.dialogRef.close();
    });
    
  }
}
