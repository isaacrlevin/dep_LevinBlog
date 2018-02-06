import {
  Component, ChangeDetectorRef, DoCheck, EventEmitter, Input, IterableDiffers, OnChanges,
  Output, SimpleChange
} from '@angular/core';
import { Category, Post } from '../../models/index';
@Component({
  selector: 'blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent {
  @Input() posts: Post[];
  email: string;

  constructor() { }
}
