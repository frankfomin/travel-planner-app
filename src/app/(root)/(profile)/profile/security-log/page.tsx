import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { headers } from "next/headers";

type SecurityLog = {
  id: number;
  userId: string;
  date: string;
  type: string;
  provider: string;
  ip: string;
  country: string;
};


async function getSecurityLog() {
  const { data } = await axios.get("http://localhost:3000/api/getSecurityLog", {
    headers: Object.fromEntries(headers()),
  });

  return data as SecurityLog[];
}

export default async function SecurityLogPage() {
  const securityLog = await getSecurityLog();

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">User</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Ip address</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {securityLog?.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{log.provider}</TableCell>
            <TableCell>{log.type}</TableCell>
            <TableCell>{log.ip}</TableCell>
            <TableCell>{new Date(log.date).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
