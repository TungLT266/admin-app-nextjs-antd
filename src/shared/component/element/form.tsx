import { Form } from "antd";

interface FormItemProps {
  label: string;
  name: string;
  children: React.ReactNode;
}

export const FormItemCustom = ({ label, name, children }: FormItemProps) => {
  return (
    <Form.Item label={label} name={name} style={{ margin: 0 }}>
      {children}
    </Form.Item>
  );
};
