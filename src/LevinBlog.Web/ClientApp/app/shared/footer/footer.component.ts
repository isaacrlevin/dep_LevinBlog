import {
  Component, ChangeDetectorRef, DoCheck, EventEmitter, Input, IterableDiffers, OnChanges,
  Output, SimpleChange
} from '@angular/core';
import { LoadingService, SignupService } from '../../services/index';
@Component({
  selector: 'foot',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  email: string;
  constructor(private signupService: SignupService, public loadingService: LoadingService) { }

  signup() {
    this.signupService.create(this.email)
      .subscribe(
      data => {
        alert('Thanks for your interest, an email has been dispatched to you.');
        this.email = '';
      },
      error => {
      });
  }
}
