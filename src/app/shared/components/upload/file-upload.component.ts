import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'file-upload',
    template: `
        <div>
            <p>File Upload - select file (max 2MB):</p>
            <input type='file' (change)='changeHandler($event)'>
            <span class='badge badge-primary' [hidden]='!progress'>{{progress}} %</span>
        </div>`
})

export class FileUploadComponent {

    progress: number;
    maxSize: number = 2000000;

    @Input() url: string;
    @Output() uploaded = new EventEmitter();

    changeHandler(evt): void {
        const formData: FormData = new FormData();
        const files = evt.target.files;

        if (files.length === 0) {
            return;
        }

        const file: File = files[0];
        if (file.size > this.maxSize) {
            alert('file is too big');
            return;
        }
        formData.append('file', file, file.name);

        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (progressEvent: ProgressEvent) => {
            this.progress = +((progressEvent.loaded / progressEvent.total) * 100).toFixed();
        });

        xhr.addEventListener('load', () => {
            const result = JSON.parse(xhr.response);
            this.uploaded.emit(result.imgSrc);
        });

        xhr.open('POST', this.url, true);
        xhr.send(formData);
    }
}
