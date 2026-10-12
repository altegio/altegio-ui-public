import React from 'react'
import type { ModuleExport } from 'storybook/internal/types'
import { useOf } from '@storybook/blocks'
import '../../assets/css/iframe.css'
import './Table.css'

interface IBlockTableRow {
  arg: string
  items: string[]
}
interface IBlockTableProps {
  of: ModuleExport
  cols: IBlockTableRow
  rows: IBlockTableRow
}

export const BlockTable = ({ of, cols, rows }: IBlockTableProps) => {
  const { story } = useOf(
    of,
    ['story']
  )
  return (
    <table className="sb-stories-table">
      <tbody className="sb-stories-table__body">
        <tr className="sb-stories-table__row">
          <th className="sb-stories-table__cell sb-stories-table__cell--divided">
            <div className="sb-stories-table__cell__title">{cols.arg}</div>
            <div className="sb-stories-table__cell__title">{rows.arg}</div>
          </th>
          {cols.items.map((colItem) =>
            <th key={colItem} className="sb-stories-table__cell">
              <div className="sb-stories-table__cell__item">{colItem}</div>
            </th>
          )}
        </tr>
        {rows.items.map((rowItem) =>

          <tr key={rowItem} className="sb-stories-table__row">
            <th className="sb-stories-table__cell">
              <div className="sb-stories-table__cell__item">{rowItem}</div>
            </th>
            {cols.items.map((colItem) =>
              <td key={`${rowItem}-${colItem}`} className="sb-stories-table__cell">
                <div className="sb-stories-table__cell__story">
                  <iframe
                    id={`iframe--${story.id}`}
                    title={`${rowItem}-${colItem}`}
                    src={`iframe.html?viewMode=story&id=${story.id}&args=${cols.arg}:${colItem};${rows.arg}:${rowItem}`}
                    allow="fullscreen"
                    loading="lazy"
                    className="sb-stories-iframe"
                  ></iframe>
                </div>
              </td>)}
          </tr>
        )}
      </tbody>
    </table>
  )
}
