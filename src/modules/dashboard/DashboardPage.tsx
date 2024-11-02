"use client";
import { useEffect, useState } from "react";
import AccountGroupChart from "./chart/AccountGroupChart";
import { getAllAccountGroupApi, IAccountGroup } from "@/api/account-group";

const DashboardPage = () => {
  const [accountGroupList, setAccountGroupList] = useState<IAccountGroup[]>([]);

  useEffect(() => {
    getAllAccountGroupApi({}).then((res) => {
      setAccountGroupList(res.items || []);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3">
      {accountGroupList.map((accountGroup) => (
        <AccountGroupChart key={accountGroup._id} accountGroup={accountGroup} />
      ))}
    </div>
  );
};

export default DashboardPage;
