import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
// Observable class extensions
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
@Component({
    selector: 'pc-categories-page',
    templateUrl: './admincategory.component.html'
})

export class AdminCategoryComponent implements OnInit {
    loading = false;
    categories: Category[];
    title: string = 'Manage Categories';
    selectedCategory: Category;
    constructor(private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.selectedCategory = new Category();
        this.getAll();
    }

    create(): void {
        if (confirm(`Are you sure you want to add "${this.selectedCategory.name}" to the categories list?`)) {
            this.loading = true;
            this.categoryService.create(this.selectedCategory)
                .subscribe(() => {
                    this.getAll();
                });
        }
    }

    selectItem(category: Category): void {
        this.selectedCategory = category;
    }

    remove(id: number): void {
        if (confirm(`Are you sure you want to delete "${this.selectedCategory.name}" from the categories list?`)) {
            this.loading = true;
            this.categoryService.delete(id)
                .subscribe(() => {
                    this.getAll();
                });
        }
    }

    update(): void {
        if (confirm(`Are you sure you want to save "${this.selectedCategory.name}" changes`)) {
            this.loading = true;
            this.categoryService.update(this.selectedCategory)
                .subscribe(() => {
                    this.getAll();
                });
        }
    }

    save(): void {
        if (this.selectedCategory.id === undefined) {
            this.create();
        }
        else { this.update(); }
    }

    getAll(): void {
        this.loading = true;
        this.categoryService.getAll()
            .subscribe(categories => {
                this.categories = categories;
                this.loading = false;
            });
    }
}
