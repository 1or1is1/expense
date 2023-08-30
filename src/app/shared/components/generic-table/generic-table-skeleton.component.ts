import { Component } from '@angular/core';

@Component({
  selector: 'app-generic-table-skeleton',
  standalone: true,
  styles: [
    `
      .table-container {
        overflow-x: auto;
      }
    `,
  ],
  template: `
    <div class="container p-0">
      <div class="row my-3 my-md-4">
        <div class="col-12">
          <ng-content select="[tableCaption]"></ng-content>
          <div class="table-responsive table-container main-shadow mb-2 h-100">
            <table
              class="table table-bordered table-striped table-hover mb-0 h-100"
            >
              <thead>
                <ng-content select="[theadContent]"></ng-content>
              </thead>
              <tbody
                class="table-group-divider"
                style="--bs-table-hover-bg: var(--bs-primary-bg-subtle)"
              >
                <ng-content select="[tbodyContent]"></ng-content>
                <ng-content select="[noRecordsContent]"></ng-content>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class GenericTableSkeletonComponent {}
