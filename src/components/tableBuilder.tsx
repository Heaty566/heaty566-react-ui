import * as React from 'react';

export interface TableItem {
    label: string;
    format: (data: any) => JSX.Element | string;
    renderCol?: (data: any) => JSX.Element;
    span?: number;
}

interface TableBuilderProps {
    tableData: TableItem[];
    tableIdPath: string;
    renderRow?: (data: any, body: any) => JSX.Element;
    extraCol?: JSX.Element;
    values: any[];
    emptyContent?: string;
}

export const TableBuilder: React.FC<TableBuilderProps> = ({ tableData, values, tableIdPath, renderRow, extraCol, emptyContent = 'Danh sách trống' }) => {
    return (
        <table className="w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
                <tr>
                    {tableData.map((item, index) => {
                        return (
                            <th
                                scope="col"
                                key={index}
                                className={`py-4 px-2 text-left text-sm font-semibold text-gray-900 
                                ${index === 0 ? ' pl-4' : index === tableData.length - 1 ? 'pr-4' : ''}`}
                            >
                                {item.label}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody className="duration-300 bg-white divide-y divide-gray-200 ">
                {!Boolean(values.length) && (
                    <tr className="p-4 text-sm text-gray-500">
                        <td className="px-4 py-4 ">{emptyContent}</td>
                        {tableData.slice(0, tableData.length - 1).map((item) => (
                            <td key={item.label} className="px-4 py-4 "></td>
                        ))}
                    </tr>
                )}
                {values.map((cell, index) => {
                    const id = cell[tableIdPath] ?? `${index}`;
                    const sumSpan = tableData.reduce((pre, cur) => pre + (cur?.span || 1), 0);

                    const rowBody = tableData.map((item, index) => {
                        const width = ((item?.span !== undefined ? item.span : 1) / sumSpan) * 100;

                        return item.renderCol ? (
                            item.renderCol(cell)
                        ) : (
                            <td
                                key={index}
                                className={`py-4 px-2 text-sm  whitespace-nowrap 
                                ${index === 0 ? 'text-gray-900 font-medium pl-4' : index === tableData.length - 1 ? 'pr-4' : ''}`}
                                style={{ width: `${width}%` }}
                            >
                                {item.format(cell)}
                            </td>
                        );
                    });

                    if (renderRow) return renderRow(cell, rowBody);
                    return (
                        <tr key={id} className={`duration-300 hover:bg-gray-100 `}>
                            {rowBody}
                        </tr>
                    );
                })}
                {extraCol}
            </tbody>
        </table>
    );
};
