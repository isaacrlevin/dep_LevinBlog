// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { Tag } from '../../models';
import { TagService } from '../../services';

// Observable class extensions
// Observable operators
@Component({
  selector: 'app-admin-tags',
  templateUrl: './admintag.component.html'
})

export class AdminTagComponent implements OnInit {
  loading = false;
  tags: Tag[];
  modalRef: BsModalRef;
  title: string = 'Manage Tags';
  selectedTag: Tag;
  constructor(private tagService: TagService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.selectedTag = new Tag();
    this.getAll();
  }

  create(): void {
    if (confirm(`Are you sure you want to add "${this.selectedTag.name}" to the tags list?`)) {
      this.loading = true;
      this.tagService.create(this.selectedTag)
        .subscribe(() => {
          this.getAll();
        });
    }
  }

  selectItem(tag: Tag): void {
    this.selectedTag = tag;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(template: TemplateRef<any>) {
    this.modalRef.hide();
  }

  remove(id: number): void {
    if (confirm(`Are you sure you want to delete "${this.selectedTag.name}" from the tags list?`)) {
      this.loading = true;
      this.tagService.delete(id)
        .subscribe(() => {
          this.getAll();
        });
    }
  }

  save(): void {
    if (this.selectedTag.id === undefined) {
      this.create();
    } else {
      this.update();
    }
  }
  update(): void {
    if (confirm(`Are you sure you want to save "${this.selectedTag.name}" changes`)) {
      this.loading = true;
      this.tagService.update(this.selectedTag)
        .subscribe(() => {
          this.getAll();
        });
    }
  }

  getAll(): void {
    this.loading = true;
    this.tagService.getAll()
      .subscribe(tags => {
        this.tags = tags;
        this.loading = false;
      });
  }
}
