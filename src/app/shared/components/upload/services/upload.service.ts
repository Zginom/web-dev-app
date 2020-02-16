import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable()
export class UploadService {

    progress: number;
    maxSize: number = 2000000;
    subject: Subject<any> = new Subject();

    upload(files, url): Subject<any> {
        const formData: FormData = new FormData();

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
            let progress = +((progressEvent.loaded / progressEvent.total) * 100).toFixed();
            //this.subject.next({progress});
        });

        xhr.addEventListener('load', () => {
            const result = JSON.parse(xhr.response).imgSrc;
            this.subject.next({ result });
        });

        xhr.open('POST', url, true);
        xhr.send(formData);

        return this.subject;
    }

}
