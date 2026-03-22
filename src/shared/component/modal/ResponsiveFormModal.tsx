"use client";
import React from "react";
import { Modal, Drawer, Button, ModalProps, DrawerProps } from "antd";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useIsMobile } from "@/shared/hook/useIsMobile";

export interface ResponsiveFormModalProps extends Omit<ModalProps, "onOk" | "onCancel"> {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  drawerProps?: Partial<DrawerProps>;
}

const ResponsiveFormModal: React.FC<ResponsiveFormModalProps> = ({
  open,
  onCancel,
  onOk,
  title,
  children,
  okText,
  cancelText,
  drawerProps,
  ...rest
}) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const finalOkText = okText || t("common.save");
  const finalCancelText = cancelText || t("common.cancel");

  if (isMobile) {
    return (
      <Drawer
        title={title}
        placement="right"
        width="85vw"
        open={open}
        onClose={onCancel}
        styles={{
          body: { padding: "16px" },
          footer: { padding: "12px 16px" },
        }}
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={onCancel}>{finalCancelText}</Button>
            <Button
              type="primary"
              onClick={onOk}
              loading={rest.confirmLoading || rest.okButtonProps?.loading}
            >
              {finalOkText}
            </Button>
          </div>
        }
        {...drawerProps}
      >
        {children}
      </Drawer>
    );
  }

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      okText={finalOkText}
      cancelText={finalCancelText}
      {...rest}
    >
      {children}
    </Modal>
  );
};

export default ResponsiveFormModal;
