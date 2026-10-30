import portraitAscii from '../../assets/ascii/portrait.txt?raw';

const sourceRows = portraitAscii.replace(/\r/g, '').split('\n');
const firstRow = sourceRows.findIndex(row => /\S/.test(row));
const lastRow = sourceRows.findLastIndex(row => /\S/.test(row));
const visibleRows = firstRow < 0 ? [''] : sourceRows.slice(firstRow, lastRow + 1);
const inkRows = visibleRows.filter(row => /\S/.test(row));
const left = inkRows.length ? Math.min(...inkRows.map(row => row.search(/\S/))) : 0;
const right = Math.max(left + 1, ...visibleRows.map(row => row.trimEnd().length));
const rows = visibleRows.map(row => row.slice(left, right));

export const portrait = {
  text: rows.join('\n'),
  columns: right - left,
  rows: rows.length,
};