"use client";
import { ILoginReq, loginApi, selectCompanyApi } from "@/api/auth";
import { Button, Form, FormProps, Input, Alert } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    setError("");
    try {
      const data: ILoginReq = { ...values };
      const res = await loginApi(data);

      if (res.companies.length === 0) {
        setError("Your account is not assigned to any company.");
        return;
      }

      if (res.companies.length === 1) {
        // Auto-select the only company
        const { access_token } = await selectCompanyApi({
          tempToken: res.temp_token,
          companyCode: res.companies[0].code,
        });
        localStorage.setItem("accessToken", access_token);
        router.push("/");
      } else {
        // Multiple companies → go to selection screen
        sessionStorage.setItem("tempToken", res.temp_token);
        sessionStorage.setItem("companies", JSON.stringify(res.companies));
        sessionStorage.setItem("loginUsername", values.username || "");
        router.push("/auth/select-company");
      }
    } catch (err: any) {
      setError(
        typeof err === "string" ? err : "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[100vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
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
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Sign In
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
