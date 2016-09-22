import {Component} from "@angular/core";
import {DestinationsService} from "../../../services/destinations.svc";
import {Destination} from "../../../model/destination";
@Component({
    selector: 'timeline',
    templateUrl: 'app/components/destinations/timeline/timeline.tpl.html',
    providers: [DestinationsService],
    styleUrls: ['css/timeline.css']
})
export class Timeline {
    destinations: Destination[] = [];

    nextIndex: number = null;
    newDestinationName: string = null;

    constructor(public destinationsService: DestinationsService) {
    }

    ngOnInit() {
        this.refreshDestinations();
    }

    addDestination() {
        this.destinationsService
            .addDestination(this.newDestinationName, this.nextIndex)
            .then(() => {
                this.newDestinationName = null;
                this.refreshDestinations()
            })
            .catch(e => console.log(e));
    }

    refreshDestinations() {
        this.destinationsService.getDestinations()
            .then(d => {
                this.destinations = d;
                this.nextIndex = this.destinations.length
            })
            .catch((e) => console.log(e));
    }

    deleteDestination(destinationId: string) {
        this.destinationsService.deleteDestination(destinationId)
            .then(() => this.refreshDestinations())
            .catch(e => console.log(e));
    }

    getLabel() {
        if (this.destinations.length == 0) {
            return 'first destination';
        }

        if (this.nextIndex == this.destinations.length) {
            let last = this.destinations[this.destinations.length - 1];
            return `after "${last.name}"`;
        }

        if (this.nextIndex == 0) {
            let first = this.destinations[0];
            return `before "${first.name}"`;
        }

        let previous = this.destinations[this.nextIndex - 1];
        let next = this.destinations[this.nextIndex];

        return `between "${previous.name}" and "${next.name}"`;
    }
}