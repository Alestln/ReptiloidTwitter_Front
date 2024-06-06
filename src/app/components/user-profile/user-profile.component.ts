import {Component, OnInit} from '@angular/core';
import {UserProfileService} from "../../services/api/user-profile.service";
import {ActivatedRoute} from "@angular/router";
import {UserProfileInfo} from "../../types/domain/user-profile/UserProfileInfo";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  info: UserProfileInfo | null = null;
  errorMessage: string | null = null;

  constructor(private userProfileService: UserProfileService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id : string | null = this.route.snapshot.paramMap.get('id');
    if (id){
      this.userProfileService.getUserProfileInfo(id).subscribe({
        next: (data) => {
          this.info = data;
          console.log(data);
        },
        error: (error) => {
          this.errorMessage = error;
          console.error(error);
        }
      });
    }
    else {
      this.errorMessage = "User not found";
    }
  }

  protected readonly btoa = btoa;
}
