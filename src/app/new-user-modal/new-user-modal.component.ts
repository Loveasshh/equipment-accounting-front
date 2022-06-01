import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SignUpInfo } from '../auth/signup-info';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.css']
})
export class NewUserModalComponent implements OnInit {
  public isExist!: boolean;
  constructor(public dialogRef: MatDialogRef<NewUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SignUpInfo,
    public snackBar: MatSnackBar, private userService: UserService) { }

  ngOnInit(): void {
  }

  onClose(): void{
    this.dialogRef.close();
  }

  onSave() {
    
    console.log(this.data);
    this.userService.existByUsername(this.data.username).subscribe((isExist) =>{
      this.isExist = isExist;
      if (!isExist) {
        this.dialogRef.close(this.isExist);
        this.userService.attemptAuth(this.data).subscribe(()=>{
          setTimeout("window.location.reload()",2000);
          this.snackBar.open("Пользователь успешно добавлен", "", {
            duration: 2000
          });
     
        });
      }
    });
   
  }
}
