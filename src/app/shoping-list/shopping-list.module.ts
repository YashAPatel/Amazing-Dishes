import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoggingService } from "../logging.service";
import { SharedModule } from "../shared/shared.module";
import { ShopingEditComponent } from "./shoping-edit/shoping-edit.component";
import { ShopingListComponent } from "./shoping-list.component";

@NgModule({
    declarations: [
        ShopingListComponent,
        ShopingEditComponent,
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            { path: '', component: ShopingListComponent}
        ]),
        SharedModule
    ],
    providers: [LoggingService]
})
export class ShoppingListModule {}