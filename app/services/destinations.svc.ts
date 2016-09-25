import {Destination} from "../model/destination";
import {Injectable} from "@angular/core";

@Injectable()
export class DestinationsService {
    destinations: Destination[];

    constructor() {
        this.destinations = [
            new Destination("1", "Минск", "lightgreen"),
            new Destination("2", "Варшава", "lightyellow")
        ];
    }

    public getDestinations(): Promise<Destination[]> {
        return Promise.resolve(this.destinations);
    }

    public addDestination(name: string, index: number): Promise<Destination> {
        let destination = new Destination((Math.random() * 100000).toString(), name, "lightgreen");
        this.destinations.splice(index, 0, destination);
        return Promise.resolve(destination);
    }

    public deleteDestination(destinationId: string): Promise<void> {
        this.destinations = this.destinations.filter(d => d.id != destinationId);
        return Promise.resolve();
    }


    public moveDestination(destinationId: string, afterDestination: string) {
        let dest = this.destinations.find(d => d.id === destinationId);
        this.destinations = this.destinations.filter(d => d.id !== destinationId);
        if (afterDestination === "_first") {
            this.destinations.splice(0, 0, dest);
        } else if (afterDestination == "_last") {
            this.destinations.push(dest);
        } else {
            let index = this.destinations.findIndex(d => d.id === afterDestination);

            this.destinations.splice(index + 1, 0, dest);
        }

        return Promise.resolve();
    }
}