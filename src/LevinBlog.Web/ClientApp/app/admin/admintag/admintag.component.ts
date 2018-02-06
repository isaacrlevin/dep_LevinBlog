import { Component, OnInit, TemplateRef } from '@angular/core';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../models/tag';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// Observable class extensions
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
@Component({
  selector: 'pc-tags-page',
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
    }
    else {
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
