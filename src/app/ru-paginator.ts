import { MatPaginatorIntl } from "@angular/material/paginator";

export function RuPaginator(): MatPaginatorIntl {
    let ruPaginatorIntl = new MatPaginatorIntl();
    ruPaginatorIntl.nextPageLabel = 'Следующая';
    ruPaginatorIntl.previousPageLabel = 'Предыдущая';
    ruPaginatorIntl.firstPageLabel = 'Начало';
    ruPaginatorIntl.lastPageLabel = 'Конец';

    ruPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        let numFirstItem = page * pageSize + 1;
        let numLastItem = Math.min(numFirstItem + pageSize -1, length);
        return numFirstItem + ' - ' + numLastItem + ' из ' + length;
    };
    return ruPaginatorIntl; 

}