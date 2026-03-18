"use client";
import { FilterOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer } from "antd";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useIsMobile } from "@/shared/hook/useIsMobile";

interface MobileFilterWrapperProps {
  /** The <Form> with all filter fields */
  children: ReactNode;
  /** Create / bulk-action buttons shown next to filter-btn on mobile, below form on desktop */
  actions?: ReactNode;
  /** Controlled open state for the mobile drawer */
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  /** Called when the Apply button is pressed (mobile only) */
  onApply: () => void;
  /** Called when the Reset button is pressed */
  onReset: () => void;
  /** Number of currently-active filter fields – drives badge & button color */
  activeFilterCount?: number;
  /** Set to false to hide the Filter button entirely (e.g. when there are no filter fields) */
  showFilterButton?: boolean;
}

/**
 * On DESKTOP  → renders the filter Form inline, with action buttons below.
 * On MOBILE   → shows action buttons + a Filter button that opens a bottom Drawer.
 *               Filter fields are only shown inside the Drawer.
 *               Filters are only applied when the user taps "Apply".
 */
export default function MobileFilterWrapper({
  children,
  actions,
  open,
  onOpen,
  onClose,
  onApply,
  onReset,
  activeFilterCount = 0,
  showFilterButton = true,
}: MobileFilterWrapperProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  // ── Mobile layout ──────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        {/* Actions row + Filter button */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}>
          {actions}
          {showFilterButton && (
            <Badge count={activeFilterCount} size="small" offset={[-4, 4]}>
              <Button
                icon={<FilterOutlined />}
                onClick={onOpen}
                type={activeFilterCount > 0 ? "primary" : "default"}
              >
                {t("common.filter")}
              </Button>
            </Badge>
          )}
        </div>

        {/* Right drawer with form fields */}
        <Drawer
          title={t("common.filter")}
          placement="right"
          width="85vw"
          open={open}
          onClose={onClose}
          styles={{
            body: { overflowY: "auto", padding: "16px" },
            footer: { padding: "12px 16px" },
          }}
          footer={
            <div className="flex justify-end gap-2">
              <Button onClick={onReset}>{t("common.reset")}</Button>
              <Button
                type="primary"
                onClick={() => {
                  onApply();
                  onClose();
                }}
              >
                {t("common.apply")}
              </Button>
            </div>
          }
        >
          {children}
        </Drawer>
      </>
    );
  }

  // ── Desktop layout ─────────────────────────────────────────────
  return (
    <div style={{ marginBottom: 20 }}>
      {children}
      {actions && (
        <div className="flex gap-2 items-center mt-2">{actions}</div>
      )}
    </div>
  );
}
