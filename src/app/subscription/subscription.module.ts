import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';

const routes: Routes = [{ path: '', component: SubscriptionComponent }];

@NgModule({
  declarations: [SubscriptionComponent],
  imports: [RouterModule.forChild(routes)],
})
export class SubscriptionModule {}
