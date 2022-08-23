export class WHProduct {
    id: number;
    label: string;
    qtyAvailable: number;
    qtyReserved: number;

    constructor(id: number, label: string, qtyAvailable: number, qtyReserved: number) {
        this.id = id;
        this.label = label;
        this.qtyAvailable = qtyAvailable;
        this.qtyReserved = qtyReserved;
    }

}