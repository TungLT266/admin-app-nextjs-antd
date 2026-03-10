"use client";
import { ICompanyOption, selectCompanyApi } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, Avatar, Button, Input, Spin, Typography } from "antd";
import {
  BankOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const { Title, Text } = Typography;

const SelectCompanyPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [companies, setCompanies] = useState<ICompanyOption[]>([]);
  const [filtered, setFiltered] = useState<ICompanyOption[]>([]);
  const [tempToken, setTempToken] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<string>(""); // companyCode being selected
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("tempToken");
    const storedCompanies = sessionStorage.getItem("companies");
    const storedUsername = sessionStorage.getItem("loginUsername");

    if (!storedToken || !storedCompanies) {
      router.replace("/auth/login");
      return;
    }

    setTempToken(storedToken);
    setUsername(storedUsername || "");
    const list: ICompanyOption[] = JSON.parse(storedCompanies);
    setCompanies(list);
    setFiltered(list);
  }, [router]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      companies.filter(
        (c) =>
          c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
      )
    );
  }, [search, companies]);

  const handleSelect = async (company: ICompanyOption) => {
    setLoading(company.code);
    setError("");
    try {
      const { access_token } = await selectCompanyApi({
        tempToken,
        companyCode: company.code,
      });
      sessionStorage.removeItem("tempToken");
      sessionStorage.removeItem("companies");
      sessionStorage.removeItem("loginUsername");
      localStorage.setItem("accessToken", access_token);
      router.push("/");
    } catch (err: unknown) {
      setError(typeof err === "string" ? err : t("auth.selectCompany.error"));
      setLoading("");
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/auth/login");
  };

  // Generate a color from company code for avatar
  const getAvatarColor = (code: string) => {
    const colors = [
      "#4F46E5", "#0891B2", "#059669", "#D97706",
      "#DC2626", "#7C3AED", "#DB2777", "#0284C7",
    ];
    let hash = 0;
    for (let i = 0; i < code.length; i++) hash += code.charCodeAt(i);
    return colors[hash % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <BankOutlined className="text-white text-base" />
          </div>
          <span className="font-semibold text-gray-800 text-lg">Admin App</span>
        </div>
        <Button
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          type="text"
          className="text-gray-500 hover:text-red-500"
        >
          {t("auth.selectCompany.logout")}
        </Button>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Title block */}
          <div className="text-center mb-10">
            <Avatar
              size={64}
              className="bg-indigo-100 text-indigo-600 text-2xl mb-4"
            >
              {username.charAt(0).toUpperCase()}
            </Avatar>
            <Title level={3} className="!mb-1 !text-gray-800">
              {t("auth.selectCompany.title")}, {username}!
            </Title>
            <Text className="text-gray-500">
              {t("auth.selectCompany.subtitle")}
            </Text>
          </div>

          {error && (
            <Alert
              type="error"
              message={error}
              showIcon
              className="mb-6"
              closable
              onClose={() => setError("")}
            />
          )}

          {/* Search */}
          {companies.length > 4 && (
            <Input
              prefix={<SearchOutlined className="text-gray-400" />}
              placeholder={t("auth.selectCompany.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-6 rounded-xl"
              size="large"
              allowClear
            />
          )}

          {/* Company grid */}
          {filtered.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No companies found.
            </div>
          ) : (
            <div
              className={`grid gap-4 ${
                filtered.length === 1
                  ? "grid-cols-1 max-w-sm mx-auto"
                  : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {filtered.map((company) => (
                <button
                  key={company._id}
                  onClick={() => handleSelect(company)}
                  disabled={!!loading}
                  className={`
                    group relative bg-white rounded-2xl border-2 p-6 text-left
                    transition-all duration-200 cursor-pointer
                    hover:border-indigo-400 hover:shadow-lg hover:-translate-y-0.5
                    focus:outline-none focus:ring-2 focus:ring-indigo-400
                    ${loading === company.code ? "border-indigo-400 shadow-lg" : "border-gray-100 shadow-sm"}
                    ${loading && loading !== company.code ? "opacity-50" : ""}
                  `}
                >
                  {loading === company.code && (
                    <div className="absolute inset-0 bg-white/70 rounded-2xl flex items-center justify-center z-10">
                      <Spin />
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                      style={{ backgroundColor: getAvatarColor(company.code) }}
                    >
                      {company.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 text-base truncate group-hover:text-indigo-700 transition-colors">
                        {company.name}
                      </div>
                      <div className="text-sm text-gray-400 mt-0.5 font-mono">
                        {company.code}
                      </div>
                      {company.description && (
                        <div className="text-sm text-gray-500 mt-1.5 line-clamp-2">
                          {company.description}
                        </div>
                      )}
                    </div>
                    <div className="text-indigo-300 group-hover:text-indigo-500 transition-colors text-xl mt-1">
                      →
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SelectCompanyPage;
