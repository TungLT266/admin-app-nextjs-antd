"use client";
import { Card, List, Pagination, Spin, TableProps } from "antd";
import { ReactNode } from "react";
import { Table } from "antd";
import { useIsMobile } from "@/shared/hook/useIsMobile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyCol = any;

/**
 * ResponsiveTable – renders an Ant Design <Table> on desktop and a Card list on mobile.
 * Drop-in replacement for <Table> with the same props.
 */
export default function ResponsiveTable<T extends object>({
  columns,
  dataSource,
  loading,
  pagination,
  onChange,
  rowSelection,
  expandable,
  bordered,
  ...rest
}: TableProps<T>) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Table<T>
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
        rowSelection={rowSelection}
        expandable={expandable}
        bordered={bordered}
        {...rest}
      />
    );
  }

  // ── Mobile card list ──────────────────────────────────────────────
  const allCols: AnyCol[] = columns ?? [];
  const actionCol = allCols.find(
    (c) => c.key === "action" || c.key === "actions" || c.fixed === "right"
  );
  const dataCols = allCols.filter(
    (c) => c.key !== "action" && c.key !== "actions" && c.fixed !== "right"
  );

  const getVal = (record: T, col: AnyCol): ReactNode => {
    const raw = col.dataIndex ? (record as AnyCol)[col.dataIndex] : undefined;
    return col.render ? col.render(raw, record, 0) : (raw as ReactNode);
  };

  const paginationConfig =
    pagination && typeof pagination !== "boolean" ? pagination : null;

  return (
    <Spin spinning={!!loading}>
      <List<T>
        dataSource={(dataSource as T[]) ?? []}
        rowKey={(r) => (r as AnyCol).key ?? (r as AnyCol)._id ?? Math.random()}
        locale={{ emptyText: " " }}
        renderItem={(record) => (
          <Card
            size="small"
            style={{ marginBottom: 10, borderRadius: 8 }}
            styles={{ body: { padding: "10px 12px" } }}
          >
            {dataCols.map((col: AnyCol) => (
              <div
                key={col.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "3px 0",
                  borderBottom: "1px solid #f0f0f0",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    color: "#888",
                    fontSize: 12,
                    flexShrink: 0,
                    minWidth: 90,
                  }}
                >
                  {typeof col.title === "string" ? col.title : col.key}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    textAlign: "right",
                    wordBreak: "break-word",
                  }}
                >
                  {getVal(record, col)}
                </span>
              </div>
            ))}

            {actionCol && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 6,
                  paddingTop: 8,
                  flexWrap: "wrap",
                }}
              >
                {actionCol.render
                  ? actionCol.render(
                      actionCol.dataIndex
                        ? (record as AnyCol)[actionCol.dataIndex]
                        : undefined,
                      record,
                      0
                    )
                  : null}
              </div>
            )}
          </Card>
        )}
      />

      {paginationConfig && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, marginBottom: 8 }}>
          <Pagination
            size="small"
            current={paginationConfig.current}
            pageSize={paginationConfig.pageSize}
            total={paginationConfig.total}
            showSizeChanger={paginationConfig.showSizeChanger}
            pageSizeOptions={paginationConfig.pageSizeOptions}
            onChange={(page, size) => {
              if (onChange) {
                onChange(
                  { current: page, pageSize: size, total: paginationConfig.total },
                  {},
                  {},
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  { currentDataSource: [], action: "paginate" } as any
                );
              }
              if (paginationConfig.onChange) {
                paginationConfig.onChange(page, size);
              }
            }}
          />
        </div>
      )}
    </Spin>
  );
}
