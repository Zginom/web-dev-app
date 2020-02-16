import {inject, TestBed} from '@angular/core/testing';
import {ItemsService} from './items.service';
import {AuthService} from "../../../root/components/auth/services/auth.service";
import {Api} from "../../../../utils/api";
import {BehaviorSubject} from "rxjs";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('itemsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [],
            providers: [
                ItemsService,
                AuthService
            ]
        });
    });

    it('fetch method should return response', () => {
        const filters = new BehaviorSubject({title: 'tomato'});
        const expectedReqUrl = Api.ITEMS_END_POINT + "?title=tomato";

        const itemsService = TestBed.get(ItemsService);
        const http = TestBed.get(HttpTestingController);
        // fake response
        const expectedData = [{title: 'potatoes'}];
        let actualData = [];

        itemsService
            .fetch(filters.getValue())
            .subscribe((data: any) => {
                actualData = data;
            });

        const req = http.expectOne(expectedReqUrl);
        expect(req.request.method).toEqual('GET');
        req.flush(expectedData);
        expect(actualData).toEqual(expectedData);
        http.verify();
    });

    it('remove method should return {ok:1}', inject([ItemsService], (itemsService) => {
        const itemId = 123;
        const serverUrl = `${Api.ITEMS_END_POINT}/${itemId}`;
        const responseBody = {ok: 1};
        const http = TestBed.get(HttpTestingController);

        itemsService
            .remove(itemId)
            .subscribe(
                response => {
                    expect(response.ok).toBeTruthy();
                });

        const req = http.expectOne(serverUrl);
        expect(req.request.method).toBe('DELETE');
        req.flush(responseBody);
        http.verify();
    }));

});
