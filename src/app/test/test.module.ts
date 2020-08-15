import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestRoutingModule } from './test-routing.module';
import { SharedModule } from "../shared/shared.module";
import { TestComponentComponent } from './test-component/test-component.component';

@NgModule({
  imports: [CommonModule, TestRoutingModule, SharedModule],
  declarations: [TestComponentComponent],
  entryComponents: [],
})
export class TestModule {}
