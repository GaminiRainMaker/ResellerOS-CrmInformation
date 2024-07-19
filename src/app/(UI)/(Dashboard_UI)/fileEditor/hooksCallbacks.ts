/* eslint-disable import/no-extraneous-dependencies */

'use client';

import Handsontable from 'handsontable';

const headerAlignments = new Map([
  ['9', 'htCenter'],
  ['10', 'htRight'],
  ['12', 'htCenter'],
]);

type AddClassesToRows = (
  TD: any,
  row: any,
  column: any,
  prop: number | string | any,
  value: any,
  cellProperties: Handsontable.CellProperties | any,
  ODD_ROW_CLASS?: any,
) => void;


export const addClassesToRows: AddClassesToRows = (
  TD,
  row,
  column,
  prop,
  value,
  cellProperties,
  ODD_ROW_CLASS,
) => {
  // Adding classes to `TR` just while rendering first visible `TD` element
  if (column !== 0) {
    return;
  }

  const {parentElement} = TD;

  if (parentElement === null) {
    return;
  }

  // Add class to odd TRs
  if (row % 2 === 0) {
    Handsontable.dom.addClass(parentElement, ODD_ROW_CLASS);
  } else {
    Handsontable.dom.removeClass(parentElement, ODD_ROW_CLASS);
  }
};

export function alignHeaders(
  this: Handsontable,
  column: number,
  TH: HTMLTableCellElement,
) {
  if (column < 0) {
    return;
  }

  const alignmentClass = this.isRtl() ? 'htRight' : 'htLeft';

  if (TH.firstChild) {
    if (headerAlignments.has(column.toString())) {
      Handsontable.dom.removeClass(
        TH.firstChild as HTMLElement,
        alignmentClass,
      );
      Handsontable.dom.addClass(
        TH.firstChild as HTMLElement,
        headerAlignments.get(column.toString()) as string,
      );
    } else {
      Handsontable.dom.addClass(TH.firstChild as HTMLElement, alignmentClass);
    }
  }
}
