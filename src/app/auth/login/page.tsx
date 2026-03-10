"use client";
import { ILoginReq, loginApi, selectCompanyApi } from "@/api/auth";
import { Button, Form, FormProps, Input, Alert } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const LoginPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    setError("");
    try {
      const data: ILoginReq = { ...values };
      const res = await loginApi(data);

      if (res.access_token) {
        // ADMIN: direct access_token returned, no company selection needed
        localStorage.setItem("accessToken", res.access_token);
        router.push("/");
      } else if (res.companies!.length === 1) {
        // Auto-select the only company
        const { access_token } = await selectCompanyApi({
          tempToken: res.temp_token!,
          companyCode: res.companies![0].code,
        });
        localStorage.setItem("accessToken", access_token);
        router.push("/");
      } else {
        // Multiple companies → go to selection screen
        sessionStorage.setItem("tempToken", res.temp_token!);
        sessionStorage.setItem("companies", JSON.stringify(res.companies));
        sessionStorage.setItem("loginUsername", values.username || "");
        router.push("/auth/select-company");
      }
    } catch (err: any) {
      setError(
        typeof err === "string" ? err : t("auth.login.error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[100vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{t("auth.login.title")}</h1>
          <p className="text-gray-500 mt-2">{t("auth.login.subtitle")}</p>
        </div>

        {error && (
          <Alert type="error" message={error} className="mb-5" showIcon />
        )}

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item<FieldType>
            label={t("auth.login.username")}
            name="username"
            rules={[{ required: true, message: t("common.required") }]}
          >
            <Input placeholder={t("auth.login.username")} />
          </Form.Item>

          <Form.Item<FieldType>
            label={t("auth.login.password")}
            name="password"
            rules={[{ required: true, message: t("common.required") }]}
          >
            <Input.Password placeholder={t("auth.login.password")} />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              {t("auth.login.signIn")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

type FieldType = {
  username?: string;
  password?: string;
};

export default LoginPage;
