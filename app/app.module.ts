import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {Timeline} from "./components/destinations/timeline/timeline.cmp";
import {AppComponent} from "./app.cmp";
import {FormsModule}   from '@angular/forms'

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [Timeline, AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}