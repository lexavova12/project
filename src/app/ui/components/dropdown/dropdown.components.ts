import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from '../../model/SelectItem';

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.components.html',
    styleUrls: ['./dropdown.components.scss']
})
export class DropDownComponent {

    @Input()
    selectedValue: string;

    @Input()
    placeholder: string;

    @Input()
    options: SelectItem[];

    @Output() 
    onChange?: EventEmitter<any> = new EventEmitter<any>();

    onModelChange($event) {
        this.onChange.emit($event);
    }
}