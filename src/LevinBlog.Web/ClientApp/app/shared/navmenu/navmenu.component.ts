import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
@Component({
  selector: 'nav-menu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavMenuComponent {
  constructor(private route: ActivatedRoute, public loadingService: LoadingService,
    private router: Router) {
    router.events.subscribe((val) => {
      this.isNavbarCollapsed = true;
      this.search = "";
    });
  }

  search: string;

  isNavbarCollapsed: boolean = true;

  searchPosts(): any {
    this.router.navigate(['/search', this.search]);
  }
}
