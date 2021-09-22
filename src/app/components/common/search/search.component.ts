import { Component, OnInit, ViewEncapsulation } from '@angular/core'

@Component( {
    selector: 'app-search',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './search.component.html',
    styleUrls: [ './search.component.scss' ]
} )
export class SearchComponent implements OnInit {

    public inputValue?: string
    public options: string[] = []

    constructor() {
    }

    ngOnInit(): void {
    }

    onInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value
        this.options = value ? [ value, value + value, value + value + value ] : []
    }

}
