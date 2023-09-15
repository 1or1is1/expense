import { NgModule } from '@angular/core';
import {
  CanvasJSAngularChartsModule,
  CanvasJSChart,
} from '@canvasjs/angular-charts';

@NgModule({
  imports: [CanvasJSAngularChartsModule],
  exports: [CanvasJSChart],
})
export class ChartModule {}
