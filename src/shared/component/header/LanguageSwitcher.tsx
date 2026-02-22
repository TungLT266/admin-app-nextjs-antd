"use client";
import { useI18nContext } from "@/shared/context/I18nContextProvider";
import { Button, Dropdown, MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

export default function LanguageSwitcher() {
  const { language, changeLanguage, supportedLanguages } = useI18nContext();

  const current = supportedLanguages.find((l) => l.code === language);

  const items: MenuProps["items"] = supportedLanguages.map((lang) => ({
    key: lang.code,
    label: (
      <span className={`flex items-center gap-2 ${language === lang.code ? "font-semibold" : ""}`}>
        <span>{lang.flag}</span>
        <span>{lang.label}</span>
      </span>
    ),
    onClick: () => changeLanguage(lang.code),
  }));

  return (
    <Dropdown menu={{ items, selectedKeys: [language] }} trigger={["click"]} placement="bottomRight">
      <Button
        type="text"
        icon={<GlobalOutlined />}
        className="flex items-center gap-1 text-gray-600 hover:text-blue-500"
        style={{ height: 40 }}
      >
        <span className="hidden sm:inline text-sm font-medium">
          {current?.flag} {current?.label}
        </span>
      </Button>
    </Dropdown>
  );
}
